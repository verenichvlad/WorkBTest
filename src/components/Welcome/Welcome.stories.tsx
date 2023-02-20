import { ComponentStory, ComponentMeta } from '@storybook/react';

import Welcome from './Welcome';

export default {
  title: 'Example/Welcome',
  component: Welcome,
} as ComponentMeta<typeof Welcome>;

const Template: ComponentStory<typeof Welcome> = (args) => <Welcome />;

export const Default = Template.bind({});