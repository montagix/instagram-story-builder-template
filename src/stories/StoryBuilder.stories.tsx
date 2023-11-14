import { StoryBuilder } from '../index';
import Layout from "./components/Layout";
import {Meta, StoryObj} from "@storybook/react";

type PageProps = React.ComponentProps<typeof StoryBuilder>;

const meta: Meta<PageProps> = {
    title: 'StoryBuilder',
    parameters: {
        layout: 'centered',
    },
    render: (args) => <Layout><StoryBuilder {...args} /></Layout>
};

export const Default: StoryObj<PageProps> = {
    args: {
        giphyKey: '',
    },
};

export default meta;