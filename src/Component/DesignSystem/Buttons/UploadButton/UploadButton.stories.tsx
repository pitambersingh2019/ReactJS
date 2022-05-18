import { ComponentStory, ComponentMeta } from "@storybook/react";

import UploadButtonComp from ".";

export default {
  title: "Example/Buttons",
  component: UploadButtonComp,
} as ComponentMeta<typeof UploadButtonComp>;

const Template: ComponentStory<typeof UploadButtonComp> = (args) => (
  <UploadButtonComp {...args} />
);

export const UploadButton = Template.bind({});
UploadButton.args = {
  label: "Upload File",
};
