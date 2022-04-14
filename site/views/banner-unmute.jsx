import { useStore } from "../store";
import Banner from "../styles/banner";
import Screencover from "../styles/screencover";
import Svg from "../styles/svg";

export default () => {
  const [state, { hideUnmuteBanner, setVolume }] = useStore();
  const video = document.getElementById("video");

  const click = () => {
    hideUnmuteBanner();
    setVolume(state.defaultVolume);
    video.muted = false;
    video.volume = state.defaultVolume / 100;
    document.body.style.cursor = "none";
  };

  return (
    <Screencover onClick={click}>
      <Banner>click to unmute</Banner>
    </Screencover>
  );
};
