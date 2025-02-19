import { useQuery } from "@tanstack/react-query";

import { fetchWords } from "../ApiService/ApiService";
import { ReturnedWordType } from "../types/words.types";

export const useWords = (word: string) =>
  useQuery<ReturnedWordType[]>({
    queryKey: ["words", word],
    queryFn: () => fetchWords(word),
  });
