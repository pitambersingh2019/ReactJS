import { ComponentStory, ComponentMeta } from "@storybook/react";

import XsButton from ".";

export default {
  title: "Example/Buttons",
  component: XsButton,
} as ComponentMeta<typeof XsButton>;

const Template: ComponentStory<typeof XsButton> = (args) => (
  <XsButton {...args} />
);

export const XsButtonDefault = Template.bind({});
XsButtonDefault.args = {
  label: "Save As Filter Set",
};

export const XsButtonDisabled = Template.bind({});
XsButtonDisabled.args = {
  label: "Save As Filter Set",
  disabled: true,
};
