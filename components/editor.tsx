"use client";

import { useTheme } from "next-themes";
import {
 defaultBlockSpecs,
} from "@blocknote/core";
import {
  useBlockNote,
  BlockNoteView,
  getDefaultReactSlashMenuItems,
} from "@blocknote/react";
import "@blocknote/react/style.css";

import { useEdgeStore } from "@/lib/edgestore";
import { helloworldBlock, insertHelloworldBlock } from "./blocks/helloworldblock";
import { TimelineBlockSpec, insertTimelineBlock } from "./blocks/timeline/timeline";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export const Editor = ({
  onChange,
  initialContent,
  editable
}: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  }

  const editor = useBlockNote({
    editable,
    initialContent: 
      initialContent 
      ? JSON.parse(initialContent)
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
    blockSpecs: {
      ...defaultBlockSpecs,
      helloworld: helloworldBlock,
      timeline: TimelineBlockSpec,
    },
    slashMenuItems: [...getDefaultReactSlashMenuItems(), 
      insertHelloworldBlock,
      insertTimelineBlock,
    ]
  });

  return (
    <div>
      <BlockNoteView 
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  )
}

export default Editor;