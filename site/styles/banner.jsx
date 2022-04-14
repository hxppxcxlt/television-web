export default (props) => (
  <div
    {...props}
    class={`
      ${props.color ? props.color : "text-white"}
      justify-center text-3xl my-auto max-w-xs
      alert bg-gray-900 select-none
    `}
  />
);
