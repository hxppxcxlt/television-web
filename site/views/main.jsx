import { Show } from "solid-js";
import { useStore } from "../store";
import {
  PanelBar,
  PanelBarLeft,
  PanelBarCenter,
  PanelBarRight,
} from "../styles/panelbar";
import FullscreenButton from "./button-fullscreen";
import MuteButton from "./button-mute";
import UnmuteBanner from "./banner-unmute";
import VolumeSlider from "./slider-volume";

export default () => {
  const [state, { setPanel, setControls }] = useStore();

  let showMouse = false;
  let showMenu = false;

  document.body.onmousemove = () => {
    if (state.showUnmuteBanner) return;

    if (!showMouse) {
      showMouse = true;
      document.body.style.cursor = "";
      setTimeout(() => {
        showMouse = false;
        if (!document.body.style.cursor) document.body.style.cursor = "none";
      }, 1500);
    }

    if (!showMenu) {
      showMenu = true;
      setControls(true);
      setTimeout(() => {
        showMenu = false;
        if (!state.panel) setControls(false);
      }, 1500);
    }
  };

  return (
    <>
      <Show when={state.showUnmuteBanner}>
        <UnmuteBanner />
      </Show>
      <Show when={state.controls}>
        <PanelBar
          onMouseOver={() => setPanel(true)}
          onMouseOut={() => setPanel(false)}
        >
          <PanelBarLeft>
            <MuteButton />
          </PanelBarLeft>
          <PanelBarCenter>
            <VolumeSlider />
          </PanelBarCenter>
          <PanelBarRight>
            <FullscreenButton />
          </PanelBarRight>
        </PanelBar>
      </Show>
    </>
  );
};
