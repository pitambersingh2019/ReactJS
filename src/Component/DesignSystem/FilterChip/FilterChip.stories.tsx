import { ComponentStory, ComponentMeta } from "@storybook/react";

import FilterChip from ".";

export default {
  title: "Example/FilterChip",
  component: FilterChip,
} as ComponentMeta<typeof FilterChip>;

const Template: ComponentStory<typeof FilterChip> = (args) => (
  <FilterChip {...args} />
);

export const Chip = Template.bind({});
Chip.args = {
  label: "Priority Level",
  count: 2,
};

export const NoCount = Template.bind({});
NoCount.args = {
  label: "Departments",
  count: 1,
};
