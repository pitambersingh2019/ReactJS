import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";

import EditableInput from ".";

export default {
  title: "Example/EditableInput",
  component: EditableInput,
} as ComponentMeta<typeof EditableInput>;

const Template: ComponentStory<typeof EditableInput> = (args) => {
  const [value, setValue] = useState("");
  return (
    <div style={{ width: "200px" }}>
      <EditableInput {...args} value={value} onChangeValue={setValue} />
    </div>
  );
};

export const Small = Template.bind({});
Small.args = {
  maxLength: 100,
  placeholder: "Display name",
};

export const Large = Template.bind({});
Large.args = {
  variant: "lg",
  maxLength: 100,
  placeholder: "Dashboard name",
};
