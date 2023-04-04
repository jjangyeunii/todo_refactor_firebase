import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMode, setMode } from "../api/firebase";

export default function useMode() {
  const queryClient = useQueryClient();

  const ModeQuery = useQuery(["mode"], getMode, {
    staleTime: 1000 * 30,
  });

  const updateMode = useMutation((type) => setMode("1", type), {
    onSuccess: () => queryClient.invalidateQueries("mode"),
  });

  return { ModeQuery, updateMode };
}
