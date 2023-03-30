import { useQuery } from "@tanstack/react-query";
import { getTodoList } from "../api/firebase";

export default function useTodoList() {
  const TodoListQuery = useQuery(["todos"], getTodoList, {
    staleTime: 1000 * 30,
  });
  return { TodoListQuery };
}
