"use client";

import { useEffect, useState } from "react";

import { useBoardStore } from "@/store/BoardStore";

import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "react-beautiful-dnd";

import { XCircleIcon } from "@heroicons/react/24/solid";
import getUrl from "@/lib/getURL";
import Image from "next/image";

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
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      };
      fetchImage();
    }
  }, [todo]);

  return (
    <div 
      className="bg-white rounded-md shadow-lg drop-shadow-md my-2"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-2">
        <p>{todo.title}</p>
        <button onClick={() => deleteTask(index, todo, id)} className="text-red-400 hover:text-red-500 transition-colors duration-200 ease-in-out">
          <XCircleIcon className="ml-5 h-7 w-7" />  
        </button> 
      </div>
      {imageUrl && (
        <div className="h-full w-full rounded-b-md overflow-hidden">
          <Image
            src={imageUrl}
            alt="Task Image"
            width={400}
            height={200}
            className="w-full rounded-b-md object-contain"
          />
        </div>
      )}
    </div>
  )
}

export default TodoCard