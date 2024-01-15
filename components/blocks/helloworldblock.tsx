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
    content: "none",
  },
  {
    render: ({ block, editor }) => (
      <RenderHelloworldBlock 
        name={block.props.name} 
        onChange={(name) => {
          editor.updateBlock(block, {
            type: "helloworld",
            props: { name: name }
          });
        }}
      />
    )
  }
);

const RenderHelloworldBlock = ({
  name,
  onChange,
} : {
  name: string
  onChange: (name: string) => void
}) => {

  return (
    <div>
      hello, 
      <input
        className="w-24 pl-2 italic"
        value={name}
        onChange={(e) => onChange(e.target.value)}
      />!
    </div>
  );
}

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