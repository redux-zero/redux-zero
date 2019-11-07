import { useContext } from "react";
import Context from "../components/Context";
import Store from "../../interfaces/Store";

export function useStore(): Store {
  return useContext(Context);
}
