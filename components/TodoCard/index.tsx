"use client";

import { XCircleIcon } from "@heroicons/react/24/solid";
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "react-beautiful-dnd";

interface Props {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const TodoCard = ({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) => {
  return (
    <div 
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-2">
        <p>{todo.title}</p>
        <button className="text-red-400 hover:text-red-500 transition-colors duration-200 ease-in-out">
          <XCircleIcon className="ml-5 h-7 w-7" />  
        </button> 
      </div>
    </div>
  )
}

export default TodoCard