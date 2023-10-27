import { database } from "@/config/appwrite"

export const getTodosGroupedByColumn = async () => {
  const data = await database.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_TRELLO_DB_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_TODOS_COLLECTION_ID!,
  );

  const todos = data.documents;

  const columns = todos.reduce((acc, todo) => {
   if(!acc.get(todo.status)) {
     acc.set(todo.status, {
       id: todo.status,
       todos: [],
     })
   }

    acc.get(todo.status)?.todos.push({
      $id: todo.$id,
      $createdAT: todo.$createdAT,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });

    return acc;
  }, new Map<TypedColumn, Column>());

  // if clumns doesnt have a key, add it with empty todos
  const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];
  columnTypes.forEach((columnType) => {
    if(!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  });

  //console.log(columns);

  // sort columns
  const sortedColumns = new Map(
    Array.from(columns.entries()).sort((a, b) => 
      columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    ));

    const board: Board = {
      columns: sortedColumns,
    };
    
    return board;
};