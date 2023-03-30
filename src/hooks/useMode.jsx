import { useQuery } from "@tanstack/react-query";
import { getMode } from "../api/firebase";

export default function useMode() {
  const ModeQuery = useQuery(["mode"], getMode, {
    staleTime: 1000 * 30,
  });
  return { ModeQuery };
}
