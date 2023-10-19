"use client"

import { useEffect } from 'react';

import { useBoardStore } from '@/store/BoardStore';

import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Column from '../Column';

const Board = () => {
  const [board, getBoard, setBoardState] = useBoardStore((state) => [state.board, state.getBoard, state.setBoardState])

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

    // Handle todo card drag and drop

  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="card" type="column" direction="horizontal">
        {(provided) => 
          <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto">
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