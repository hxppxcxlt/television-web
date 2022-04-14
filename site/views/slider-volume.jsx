import { useStore } from "../store";
import Slider from "../styles/slider";

export default () => {
  const [state, { setVolume }] = useStore();
  const video = document.getElementById("video");

  let slider;

  const setVolumeValue = () => {
    setVolume(slider.value);
    video.volume = slider.value / 100;
    video.muted = video.volume == 0 ? true : false;
  };

  return (
    <Slider
      ref={slider}
      type="range"
      step="1"
      value={state.volume}
      min="0"
      max="100"
      onChange={setVolumeValue}
      onInput={setVolumeValue}
    />
  );
};
