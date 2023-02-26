import { ComponentStory, ComponentMeta } from "@storybook/react";
import MarvelButton from "./MarvelButton";

export default {
  title: "Marvel/Button",
  component: MarvelButton,
} as ComponentMeta<typeof MarvelButton>;

const Template: ComponentStory<typeof MarvelButton> = (args) => (
  <MarvelButton label="Button" />
);

export const Default = Template.bind({});
