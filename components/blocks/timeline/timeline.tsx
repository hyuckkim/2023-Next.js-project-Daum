import { BlockSchemaWithBlock, defaultProps } from "@blocknote/core";
import { ReactSlashMenuItem, createReactBlockSpec } from "@blocknote/react";

import { Clock } from "lucide-react";
import { TimelineBlock } from "./timeline-block";

export const TimelineBlockSpec = createReactBlockSpec(
  {
    type: "timeline",
    propSchema: {
      ...defaultProps,
      data: {
        default: "0ㅫ2019ㅫ코로나19 발발ㅫ#22d3ee\n1ㅫ2020ㅫ코로나19 유행ㅫ#67e8f9\n2ㅫ2023ㅫ위드코로나 정책 시행ㅫ#a5f3fc"
      }
    } as const,
    content: "none",
  },
  {
    render: ({ block, editor }) => {
      return (
        <TimelineBlock
          data={block.props.data}
          setData={(data) => editor.updateBlock(block, {
            type: "timeline",
            props: {
              data: data
            }
          })}
          preview={!editor.isEditable}
        />
      )
    }
  }
);


export const insertTimelineBlock: ReactSlashMenuItem<
  BlockSchemaWithBlock<"timeline", typeof TimelineBlockSpec.config>
> = {
  name: "timeline",
  execute: (editor) => {
    editor.insertBlocks(
      [
        {
          type: "timeline",
        },
      ],
      editor.getTextCursorPosition().block,
      "after"
    );
  },
  aliases: [
    "timeline"
  ],
  group: "Media",
  icon: <Clock width="14" height="14" />,
  hint: "Visualize the time.",
}