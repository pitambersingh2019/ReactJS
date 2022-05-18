import { ComponentStory, ComponentMeta } from "@storybook/react";

import SplitButton from ".";

export default {
  title: "Example/Buttons/SplitButton",
  component: SplitButton,
} as ComponentMeta<typeof SplitButton>;

const Template: ComponentStory<typeof SplitButton> = (args) => (
  <SplitButton {...args} />
);

const items = [
  {
    label: "Save Filter Set",
    onClickAction: () => {
      console.log("CLICK1");
    },
  },
  {
    label: "Save As New Filter Set",
    onClickAction: () => {
      console.log("CLICK2");
    },
  },
];

export const Default = Template.bind({});
Default.args = {
  label: "Save Filter Set",
  modalItems: items,
  showModal: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Save Filter Set",
  modalItems: items,
  showModal: false,
  disabled: true,
};

export const ModalOpened = Template.bind({});
ModalOpened.args = {
  label: "Save Filter Set",
  modalItems: items,
  showModal: true,
};
