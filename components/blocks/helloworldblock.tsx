import { BlockSchemaWithBlock, defaultProps } from "@blocknote/core";
import { ReactSlashMenuItem, createReactBlockSpec } from "@blocknote/react";
import { Hand } from "lucide-react";

export const helloworldBlock = createReactBlockSpec(
  {
    type: "helloworld",
    propSchema: {
      ...defaultProps,
      name: {
        default: "John doe",
      }
    } as const,
    content: "inline",
  },
  {
    render: ({ block }) => (
      <div>
        hello, 
        <input className="w-24 pl-2 italic" value={block.props.name}/>!
      </div>
    ),
  }
);

export const insertHelloworldBlock: ReactSlashMenuItem<
  BlockSchemaWithBlock<"helloworld", typeof helloworldBlock.config>
> = {
  name: "Insert helloworld block",
  execute: (editor) => {
    editor.insertBlocks(
      [
        {
          type: "helloworld",
        },
      ],
      editor.getTextCursorPosition().block,
      "after"
    );
  },
  aliases: [
    "helloworld"
  ],
  group: "Media",
  icon: <Hand width="14" height="14" />,
  hint: "Insert an helloworld text!",
}