import { database, storage } from '@/config/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { create } from 'zustand'

interface BoardState {
  board: Board;
  searchString: string;
  newTaskInput: string;
  newTaskType: TypedColumn;
  image: File | null;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
  deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;
  setSearchString: (searchString: string) => void;
  setNewTaskInput: (input: string) => void;
  setNewTaskType: (columnId: TypedColumn) => void;
  setImage: (image: File | null) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },

  getBoard: async() => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),

  searchString: "",
  setSearchString: (searchString) => set({ searchString }),

  newTaskInput: "",
  setNewTaskInput: (input: string) => set({ newTaskInput: input }),
  
  newTaskType:"todo",
  setNewTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),

  image: null,
  setImage: (image: File | null) =>  set({ image }),

  deleteTask: async(taskIndex: number, todo: Todo, id: TypedColumn) => {
    const newColumns = new Map(get().board.columns);

    // Remove the task from the column
    newColumns.get(id)!.todos.splice(taskIndex, 1);

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }

    await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_TRELLO_DB_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_TODOS_COLLECTION_ID!,
      todoId.$id,
    );
  },

  updateTodoInDB: async(todo, columnId) => {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_TRELLO_DB_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      },
    )
  }
}));
