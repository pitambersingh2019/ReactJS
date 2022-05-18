import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from ".";

export default {
  title: "Example/Buttons",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Next",
};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
  label: "Next",
  disabled: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  label: "Cancel",
};

export const SecondaryDisabled = Template.bind({});
SecondaryDisabled.args = {
  label: "Cancel",
  variant: "secondary",
  disabled: true,
};

export const Purple = Template.bind({});
Purple.args = {
  variant: "purple",
  label: "Create new dashboard",
};

export const PurpleDisabled = Template.bind({});
PurpleDisabled.args = {
  variant: "purple",
  label: "Add",
  disabled: true,
};

export const PurpleSecondary = Template.bind({});
PurpleSecondary.args = {
  variant: "purple-secondary",
  label: "Cancel",
};

export const Large = Template.bind({});
Large.args = {
  size: "lg",
  label: "Button",
};

export const Medium = Template.bind({});
Medium.args = {
  size: "md",
  label: "Button",
};

export const IconButton = Template.bind({});
IconButton.args = {
  withIcon: true,
  label: "Create New Rule",
  width: "auto",
};
