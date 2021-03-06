import { Story } from "@storybook/react";
import log from "resources/log";
import FileUploader, { FileUploaderProps } from "./FileUploader";

export default {
  title: "Components/FileUploader",
  component: FileUploader,
};

const file = new File([new Blob(["test"], { type: "text/plain" })], "test");

const Template: Story<FileUploaderProps> = (args) => <FileUploader {...args} />;

export const Default = Template.bind({});
Default.args = {
  kind: "primary",
  size: "large",
  file,
  className: undefined,
  placeholder: "Choose a file",
  disabled: false,
  required: false,
  invalid: false,
  pending: false,
  onChange: log,
};

export const SelectedFile = Template.bind({});
SelectedFile.args = {
  file,
};
export const SelectedFileName = Template.bind({});
SelectedFileName.args = {
  fileName: "myfile.dat",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "Pick a file",
};

export const Pending = Template.bind({});
Pending.args = {
  pending: true,
};

export const Required = Template.bind({});
Required.args = {
  required: true,
};

export const Invalid = Template.bind({});
Invalid.args = {
  invalid: true,
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
};

export const Medium = Template.bind({});
Medium.args = {
  size: "medium",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
};
