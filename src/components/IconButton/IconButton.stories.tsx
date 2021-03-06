/* eslint no-console: "off" */
import Row from "components/Flexbox/Row";
import IconButton from "./IconButton";

const icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Capa_1"
    enableBackground="new 0 0 511.999 511.999"
    height="512"
    viewBox="0 0 511.999 511.999"
    width="512"
  >
    <g>
      <path d="m486.389 4.397-31.047 31.047c-21.367-3.375-82.538-9.932-147.054 12.389l155.878 155.878c22.321-64.515 15.764-125.687 12.389-147.054l31.048-31.047c5.861-5.861 5.861-15.35 0-21.213-5.863-5.863-15.351-5.863-21.214 0z" />
      <path d="m258.947 189.412c-17.545 17.545-17.545 46.093 0 63.638 17.547 17.547 46.093 17.547 63.64 0 17.547-17.545 17.547-46.093 0-63.638-17.547-17.547-46.093-17.547-63.64 0z" />
      <path d="m451.699 233.671-173.37-173.37c-21.396 10.649-42.462 24.913-61.807 44.258-46.86 46.859-61.165 83.372-79.281 129.598-8.505 21.731-18.301 46.705-32.957 76.36l97.196 97.198c29.658-14.656 54.631-24.454 76.36-32.959 46.229-18.115 82.74-32.421 129.6-79.279 19.345-19.344 33.609-40.411 44.259-61.806zm-107.899 40.594c-29.24 29.24-76.826 29.24-106.066 0-29.24-29.242-29.24-76.826 0-106.068 29.24-29.24 76.826-29.24 106.066 0 29.242 29.242 29.242 76.826 0 106.068z" />
      <path d="m57.423 369.723c-17.195 17.195-32.236 79.074-37.91 104.885-1.088 5.004.434 10.214 4.048 13.828 3.616 3.616 8.826 5.138 13.819 4.041 25.811-5.656 87.68-20.685 104.896-37.901 23.397-23.399 23.397-61.454 0-84.853-23.399-23.399-61.456-23.399-84.853 0z" />
      <path d="m2.235 292.764c3.625 5.779 10.917 8.535 17.505 6.339 4.039-.707 25.547-12.35 57.682-1.957 14.086-28.511 23.544-52.641 31.884-73.936 2.567-6.548 5.101-12.958 7.67-19.303-27.554 1.018-54.34 12.111-74.636 32.406l-37.95 37.952c-4.92 4.92-5.801 12.574-2.155 18.499z" />
      <path d="m219.235 509.764c5.925 3.646 13.579 2.765 18.499-2.155l37.952-37.95c20.295-20.297 31.392-47.084 32.408-74.641-6.343 2.567-12.75 5.101-19.296 7.665-21.306 8.351-45.434 17.809-73.945 31.895 10.349 32.001-1.326 54.067-1.957 57.682-2.159 6.45.291 13.723 6.339 17.504z" />
    </g>
  </svg>
);

export default {
  title: "components/IconButton",
  component: IconButton,
};

const { log } = console;

const Template = (args) => <IconButton icon={icon} onClick={log} {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: undefined,
  kind: undefined,
  icon,
  size: undefined,
  fill: undefined,
  disabled: undefined,
  onClick: undefined,
};

export const AllKinds = () => (
  <Row align="center center">
    <div className="m5">
      <IconButton icon={icon} onClick={log} tooltipLabel="it works" />
    </div>
    <div className="m5">
      <IconButton icon={icon} kind="primary" onClick={log} />
    </div>
    <div className="m5">
      <IconButton icon={icon} kind="secondary" onClick={log} />
    </div>
    <div className="m5">
      <IconButton icon={icon} kind="tertiary" onClick={log} />
    </div>
    <div className="m5">
      <IconButton icon={icon} kind="success" onClick={log} />
    </div>
    <div className="m5">
      <IconButton icon={icon} kind="danger" onClick={log} />
    </div>
    <div className="m5">
      <IconButton icon={icon} kind="warning" onClick={log} />
    </div>
    <div className="m5">
      <IconButton icon={icon} kind="dark" onClick={log} />
    </div>
    <div className="m5">
      <IconButton icon={icon} kind="light" onClick={log} />
    </div>
  </Row>
);

export const MultipleSizes = () => (
  <Row align="center center" wrap>
    <div className="m5">
      <IconButton icon={icon} onClick={log} size={10} />
    </div>
    <div className="m5">
      <IconButton icon={icon} onClick={log} size={20} />
    </div>
    <div className="m5">
      <IconButton icon={icon} onClick={log} size={30} />
    </div>
    <div className="m5">
      <IconButton icon={icon} onClick={log} size={40} />
    </div>
  </Row>
);
