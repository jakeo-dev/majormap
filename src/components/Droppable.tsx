import { useDroppable } from "@dnd-kit/core";

export default function Droppable(props: {
  children: React.ReactNode;
  dropId: string;
  className?: string;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: props.dropId,
  });

  
  return (
    <div
      ref={setNodeRef}
      className={`transition inset-shadow-sm ${isOver && props.dropId === "delete" ? "inset-shadow-red-500/50 bg-red-100 text-red-600" : isOver ? "inset-shadow-neutral-400/50 bg-gray-800" : "inset-shadow-neutral-600/50 bg-gray-900"} ${
        props.className
      }`}
    >
      {props.children}
    </div>
  );
}
