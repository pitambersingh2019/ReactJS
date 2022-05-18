import { ComponentStory, ComponentMeta } from "@storybook/react";

import SmallSingleSelect from "./SmallSingleSelect";

export default {
  title: "Example/SmallSingleSelect",
  component: SmallSingleSelect,
} as ComponentMeta<typeof SmallSingleSelect>;

const Template: ComponentStory<typeof SmallSingleSelect> = (args) => (
  <SmallSingleSelect {...args} />
);

export const Default = Template.bind({});
Default.args = {
  items: [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
  ],
  selectedItem: { value: 2, label: "2" },
};
