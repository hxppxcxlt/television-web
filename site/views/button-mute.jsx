import { Show } from "solid-js";
import { useStore } from "../store";
import Button from "../styles/button";
import Svg from "../styles/svg";

export default () => {
  const [state, { setVolume }] = useStore();
  const video = document.getElementById("video");

  let previousVolume = state.defaultVolume;

  const click = () => {
    if (video.muted) {
      setVolume(previousVolume);
      video.muted = false;
      video.volume = previousVolume / 100;
    } else {
      if (state.volume > 0) previousVolume = state.volume;
      else previousVolume = state.defaultVolume;
      setVolume(0);
      video.muted = true;
      video.volume = 0;
    }
  };

  return (
    <>
      <Show when={state.volume > 0}>
        <Button onClick={click}>
          <Svg alt="unmuted" />
        </Button>
      </Show>
      <Show when={state.volume == 0}>
        <Button color="text-gray-400" onClick={click}>
          <Svg alt="muted" />
        </Button>
      </Show>
    </>
  );
};
