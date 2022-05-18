import { ComponentStory, ComponentMeta } from "@storybook/react";

import UploadProgressBar from ".";

export default {
  title: "Example/UploadProgressBar",
  component: UploadProgressBar,
} as ComponentMeta<typeof UploadProgressBar>;

const Template: ComponentStory<typeof UploadProgressBar> = (args) => (
  <div style={{ width: "250px" }}>
    <UploadProgressBar {...args} />
  </div>
);

export const UploadProgressBarDefault = Template.bind({});
UploadProgressBarDefault.args = {
  fileName: "file.doc",
  info: "5.7 MB of 8.3 MB",
  completed: 34,
};
