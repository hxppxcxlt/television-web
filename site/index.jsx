import { createSignal, Show } from "solid-js";
import { render } from "solid-js/web";
import HLS from "hls.js/dist/hls.light.min";
import { StoreProvider } from "./store";
import MainView from "./views/main";
import RestartingBanner from "./views/banner-restarting";
import pkg from "../package.json";
import "./styles/global.css";

const [restarting, setRestarting] = createSignal(false);

const App = () => (
  <>
    <Show when={restarting()}>
      <RestartingBanner />
    </Show>
    <StoreProvider>
      <MainView />
    </StoreProvider>
  </>
);

let hls;
const streamURL = pkg.stream;
const notSafari = !/^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const videoScreen = document.getElementById("video");

const init = () => {
  let streamURL = `${window.location}${pkg.endpoint}`;
  const params = new URLSearchParams(window.location.search);
  if (params.get("url") != null) streamURL = params.get("url");

  hls = new HLS({
    defaultAudioCodec: "mp4a.40.2",
    autoStartLoad: false,
    liveDurationInfinity: true,
  });
  hls.attachMedia(videoScreen);

  hls.on(HLS.Events.ERROR, async (event, data) => {
    if (
      data.details === "manifestLoadError" ||
      data.details === "levelLoadError"
    ) {
      await sleep(1000);
      hls.loadSource(streamURL);
    } else {
      setRestarting(true);
      hls.destroy();
    }
  });

  hls.on(HLS.Events.MANIFEST_LOADED, async (event, data) => {
    setRestarting(false);
    if (notSafari) {
      const startTime = Number(
        data.networkDetails.response
          .match(/stream-[0-9]+.ts/)[0]
          .match(/[0-9]+/)[0]
      );
      const syncTime = await getSyncTime(startTime);
      if (syncTime !== 0) hls.startLoad(syncTime);
      else hls.startLoad();
    } else {
      hls.startLoad();
    }
  });

  hls.on(HLS.Events.DESTROYING, () => init());

  hls.loadSource(streamURL);
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getSyncTime = (startTime) =>
  fetch("/sync", {})
    .then((response) => response.text())
    .then((txt) => (isNaN(txt) ? 0 : Number(txt)))
    // -15 is halfway through a 30 second playlist
    .then((time) =>
      time !== 0 ? Math.round(time - 15.0 - startTime / 1000.0) : 0
    );

init();
render(App, document.getElementById("screen"));
