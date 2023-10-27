"use client"

import { useEffect } from 'react';

import { useBoardStore } from '@/store/BoardStore';

import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Column from '../Column';

const Board = () => {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state) => [state.board, state.getBoard, state.setBoardState, state.updateTodoInDB])

  useEffect(() => {
    getBoard()
  }, [getBoard])  

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination, type } = result; 

    // Check if user dropped the item outside of the droppable area
    if (!destination) return

    // Handle column drag and drop
    if (type === 'column') {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);

      const newColumns = new Map(entries);
      setBoardState({ ...board, columns: newColumns });
    }

    // This step is needed cause the indexes are stored as nummbers 0,1,2,3 etc. instead of ids
    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const endColIndex = columns[Number(destination.droppableId)];

    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    }

    const endCol: Column = {
      id: endColIndex[0],
      todos: endColIndex[1].todos,
    }

    if (!startCol || !endCol) return;

    if (source.index === destination.index && startCol === endCol) return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startCol.id === endCol.id) {
      //same column task drag and drop
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };

      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);

      setBoardState({ ...board, columns: newColumns });
    } else {
      // dragging task to another column
      const endTodos = Array.from(endCol.todos);
      endTodos.splice(destination.index, 0, todoMoved);

      const newEndCol = {
        id: endCol.id,
        todos: endTodos,
      };

      const newColumns = new Map(board.columns);
      newColumns.set(endCol.id, newEndCol);

      // Update in Database
      updateTodoInDB(todoMoved, endCol.id);

      setBoardState({ ...board, columns: newColumns });
    }

  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" type="column" direction="horizontal">
        {(provided) => 
          <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto">
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column 
                key={id}
                id={id}
                todos={column.todos}
                index={index}
              />
            ))}
          </div>
        }
      </Droppable>
    </DragDropContext>
  )

}

export default Board