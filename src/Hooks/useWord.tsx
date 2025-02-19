import { useQuery } from "@tanstack/react-query";

import { fetchWords } from "../ApiService/ApiService";
import { WordTypes } from "../types/words.types";

export const useWords = (word: string) =>
  useQuery<WordTypes[]>({
    queryKey: ["words", word],
    queryFn: () => fetchWords(word),
  });
