const controlGroup = "flex content-center";

export const PanelBar = (props) => (
  <div
    {...props}
    class="alert bg-gray-900 max-w-xs absolute bottom-0 right-0 z-40"
  />
);
export const PanelBarLeft = (props) => (
  <div {...props} class={`${controlGroup} rounded-l-lg`} />
);
export const PanelBarCenter = (props) => (
  <div {...props} class={`${controlGroup}`} />
);
export const PanelBarRight = (props) => (
  <div {...props} class={`${controlGroup} rounded-r-lg`} />
);
