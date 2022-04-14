import { createStore } from "solid-js/store";
import { createContext, useContext } from "solid-js";

export const StoreContext = createContext([
  {
    volume: 100,
    defaultVolume: 100,
    showUnmuteBanner: true,

    panel: false,
    controls: false,
    fullscreen: false,
    hasFullscreenEvents: false,
  },
  {},
]);

export const StoreProvider = (props) => {
  const [state, setState] = createStore({
      volume: props.volume || 100,
      defaultVolume: props.defaultVolume || 100,
      showUnmuteBanner: props.showUnmuteBanner || true,
      panel: false,
      controls: false,
      fullscreen: false,
      hasFullscreenEvents: false,
    }),
    store = [
      state,
      {
        setPanel(v) {
          setState("panel", v);
        },
        setControls(v) {
          setState("controls", v);
        },
        setFullscreen(v) {
          setState("fullscreen", v);
        },
        setHasFullscreenEvents(v) {
          setState("hasFullscreenEvents", v);
        },
        setVolume(v) {
          setState("volume", v);
        },
        hideUnmuteBanner() {
          setState("showUnmuteBanner", false);
        },
      },
    ];

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
