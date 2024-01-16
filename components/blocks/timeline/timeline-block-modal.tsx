"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog";
import { useTimelineBlock } from "@/components/blocks/timeline/use-timeline-block";
import { useEffect, useState } from "react";

export const TimelineBlockModal = () => {
  const block = useTimelineBlock();
  const [data, setData] = useState(block.data);

  useEffect(() => {
    setData(block.data);
  },[block.data]);

  const rows = data && data.split("\n").map((col) =>
    col.split("ㅫ"));

  const fixData = (row: number, col: number, value: string) => {
    if (!rows) return;
    rows[row][col] = value;
    setData(rows.map(cols => cols.join("ㅫ")).join("\n"));
  }

  return (
    <Dialog open={block.isOpen} onOpenChange={() => {
      block.onClose();
      block.succeedFunction(data);
    }}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">timeline</h2>
        </DialogHeader>
        <table>
          {rows && rows.map((cols, i) => (
            <tr key={i} className="w-full flex justify-between">
              <td>
                <input 
                  value={cols[1]} 
                  onChange={(e) => fixData(i, 1, e.target.value)} 
                  className="w-36"/>
              </td>
              <td>
                <input 
                  value={cols[2]} 
                  onChange={(e) => fixData(i, 2, e.target.value)} 
                  className="w-36"/>
              </td>
              <td>
                <input 
                  value={cols[3]} 
                  onChange={(e) => fixData(i, 3, e.target.value)} 
                  type="color"
                  className="w-24"/>
              </td>
            </tr>
          ))}
        </table>
      </DialogContent>
    </Dialog>
  )
}