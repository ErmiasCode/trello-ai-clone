import { Draggable, Droppable } from "react-beautiful-dnd"
import TodoCard from "../TodoCard";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  id: TypedColumn,
  todos: Todo[],
  index: number,
}

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

const Column = ({id, todos, index}: Props) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div 
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className={`p-2 mx-2 rounded-2xl shadow-sm ${snapshot.isDraggingOver ? 'bg-green-200' : 'bg-white/50'}`}>
                <h2 className="flex justify-between items-center text-xl font-bold p-2">
                  {idToColumnText[id]}
                  <span className="text-sm font-normal bg-gray-200 rounded-full text-gray-500 px-2 py-2">{todos.length}</span>
                </h2>

                <div className="space-y-2">
                  {todos.map((todo, index) => (
                    <Draggable key={todo.$id} draggableId={todo.$id} index={index}>
                      {(provided) => (
                        <TodoCard 
                          todo={todo}
                          index={index}
                          id={id}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                        )}
                    </Draggable>
                  ))}

                  {provided.placeholder}

                  <div className="flex justify-end items-end p-1">
                    <button className="text-green-500 hover:text-green-600 transition-colors duration-200 ease-in-out">
                      <PlusCircleIcon className="h-10 w-10" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

export default Column