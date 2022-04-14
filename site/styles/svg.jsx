export default (props) => (
  <svg
    {...props}
    class={`
      ${props.big ? "h-16 w-16" : "h-8 w-8"}
	    fill-current stroke-current
      inline-block text-center bg-cover
    `}
  >
    <use xlink:href={`#svg-${props.alt}`}></use>
  </svg>
);

