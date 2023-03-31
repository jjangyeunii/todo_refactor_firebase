import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodo, getTodoList } from "../api/firebase";

export default function useTodoList() {
  const queryClient = useQueryClient();

  const TodoListQuery = useQuery(["todos"], getTodoList, {
    staleTime: 1000 * 30,
  });

  const addNewTodo = useMutation(({ text, state }) => addTodo(text, state), {
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });
  return { TodoListQuery, addNewTodo };
}
