import type { StoryObj } from '@storybook/react';
import { Meta } from '@storybook/react';

import { IconArrowUpFill } from '@/public/svgs';
import { TextInput } from '@/shared/components/text-input/TextInput';

type Story = StoryObj<typeof TextInput>;

const meta: Meta<typeof TextInput> = {
  title: 'Input/TextInput',
  component: TextInput,
};

export default meta;

export const Default: Story = {
  args: {
    maxLength: 8,
    placeholder: '이름을 입력해주세요',
  },
};

export const Price: Story = {
  args: {
    rightSection: <span>원</span>,
    placeholder: '0',
    classNames: {
      input: 'text-right',
    },
  },
};

export const Comment: Story = {
  render: () => (
    <TextInput
      rightSection={
        <span>
          <IconArrowUpFill />
        </span>
      }
      placeholder="댓글을 남겨보세요."
    />
  ),
};
