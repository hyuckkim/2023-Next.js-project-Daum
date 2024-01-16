import { ClassValue } from "clsx";
import { useTimelineBlock } from "./use-timeline-block";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const TimelineBlock = ({
  className,
  data,
  setData,
  preview,
} : {
  className?: ClassValue,
  data: string,
  setData?: (data: string) => void,
  preview?: boolean,
}) => {
  const block = useTimelineBlock();

  const rows = data && data.split("\n").map((col) =>
    col.split("ㅫ"));
  
  return (
    <div className={cn(
      "flex flex-col group relative",
      className
    )}>
      <div className="flex w-full mt-6">
        {rows && rows.map((row) => (
          <div key={row[0]} className="flex flex-col w-full">
            <div className="text-2xl mx-2">{row[1]}</div>
            <div className="mx-2 mb-3">{row[2]}</div>
            <div className={cn(
              "w-full h-4",
            )} style={{backgroundColor: row[3]}} />
          </div>
        ))}
        {!preview &&
          <div
            className="w-4 h-full absolute right-[-16px] opacity-0 hover:opacity-100 text-center cursor-pointer flex flex-col justify-center bg-gray-100"
          >
            <div>
              &gt;
            </div>
          </div>
        }
      </div>
      {!preview && 
      <Button className="absolute right-2 top-0 hidden group-hover:block"
        size="sm"
        variant="ghost"
        onClick={() => {
          block.onOpen(data);
          if (!!setData) {
            block.setSucceedFunction(setData);
          }
        }}
      >Edit
      </Button>}
    </div>
  );
}