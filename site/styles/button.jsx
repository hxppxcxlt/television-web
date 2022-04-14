export default (props) => (
  <button {...props} class={props.color ? props.color : "text-white"} />
);
