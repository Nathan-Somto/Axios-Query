import { useQuery } from "axios-query";

type TodoResponse = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}[];

export function Todos() {
  const { Loader, Error, data } = useQuery<TodoResponse>({
    route: "/todos",
    queryKey: ["todos"],
   displayToast: true
  });
  console.log(JSON.stringify(data));
  return (
    <>
      {Loader && <Loader />}
      {Error && <Error />}
      <ul>
        {data?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}
