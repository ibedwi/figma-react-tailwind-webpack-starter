/**
 * This is example of message types that can be use in the `code.ts` or `app.tsx`
 */

export type FigmaMessage =
  | {
      type: "send-message-to-backend";
    }
  | {
      type: "send-message-to-ui";
    };
