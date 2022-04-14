import { Switch, Match } from "solid-js";
import { useStore } from "../store";
import Button from "../styles/button";
import Svg from "../styles/svg";

export default () => {
  const [state, { setFullscreen, setHasFullscreenEvents }] = useStore();
  const screen = document.getElementById("screen");

  const fullscreen = () => {
    setFullscreen(true);
    screen.requestFullscreen();
  };

  const unfullscreen = () => document.exitFullscreen();

  const exitFullscreen = () => {
    if (
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    )
      setFullscreen(false);
  };

  if (!state.hasFullscreenEvents) {
    document.addEventListener("fullscreenchange", exitFullscreen, false);
    document.addEventListener("mozfullscreenchange", exitFullscreen, false);
    document.addEventListener("MSFullscreenChange", exitFullscreen, false);
    document.addEventListener("webkitfullscreenchange", exitFullscreen, false);
    setHasFullscreenEvents(true);
  }

  return (
    <Switch>
      <Match when={state.fullscreen}>
        <Button onClick={unfullscreen}>
          <Svg alt="unfullscreen" />
        </Button>
      </Match>
      <Match when={!state.fullscreen}>
        <Button onClick={fullscreen}>
          <Svg alt="fullscreen" />
        </Button>
      </Match>
    </Switch>
  );
};
