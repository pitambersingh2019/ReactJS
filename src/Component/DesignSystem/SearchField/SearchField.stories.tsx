import { ComponentStory, ComponentMeta } from "@storybook/react";

import SearchField from ".";

export default {
  title: "Example/SearchField",
  component: SearchField,
} as ComponentMeta<typeof SearchField>;

const Template: ComponentStory<typeof SearchField> = (args) => (
  <div style={{ width: "200px" }}>
    <SearchField {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  placeholder: "Search",
  onChange: (text) => {
    console.log(text);
  },
};

export const Small = Template.bind({});
Small.args = {
  size: "sm",
  placeholder: "Search",
  onChange: (text) => {
    console.log(text);
  },
};
