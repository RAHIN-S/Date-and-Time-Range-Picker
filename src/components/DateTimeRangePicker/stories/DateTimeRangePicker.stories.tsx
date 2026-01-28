import type { Meta, StoryObj } from "@storybook/react-vite";
// import { DateTimeRangePicker } from "../DateTimeRangePicker";
import { DateTimeRangePicker } from "../DateTimeRangePicker";

const meta: Meta<typeof DateTimeRangePicker> = {
  title: "Components/DateTimeRangePicker",
  component: DateTimeRangePicker,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof DateTimeRangePicker>;

/* -------------------------------------------------- */
/* Default usage                                     */
/* -------------------------------------------------- */

export const Default: Story = {};

/* -------------------------------------------------- */
/* Invalid range scenario                            */
/* -------------------------------------------------- */

export const InvalidRange: Story = {
  name: "Invalid range (end before start)",
};

/* -------------------------------------------------- */
/* Keyboard-only usage                               */
/* -------------------------------------------------- */

export const KeyboardOnly: Story = {
  name: "Keyboard only usage",
  parameters: {
    docs: {
      description: {
        story:
          "Use Tab, Arrow keys, and Enter/Space to complete the range without using the mouse.",
      },
    },
  },
};

/* -------------------------------------------------- */
/* DST — Spring Forward (US)                          */
/* -------------------------------------------------- */

export const DST_SpringForward_US: Story = {
  name: "DST – Spring Forward (America/New_York)",
  parameters: {
    docs: {
      description: {
        story: `
This scenario tests the US daylight saving time **start**.

Steps to test:
1. Select March 9 → March 10
2. Switch timezone between UTC and America/New_York
3. Verify that the **selected instant does not shift**
4. Only the displayed time changes
        `,
      },
    },
  },
};

/* -------------------------------------------------- */
/* DST — Fall Back (US)                               */
/* -------------------------------------------------- */

export const DST_FallBack_US: Story = {
  name: "DST – Fall Back (America/New_York)",
  parameters: {
    docs: {
      description: {
        story: `
This scenario tests the US daylight saving time **end**.

Steps to test:
1. Select November 2 → November 3
2. Switch timezone between UTC and America/New_York
3. Ensure the instant remains stable
4. No silent time shift occurs
        `,
      },
    },
  },
};
