import { useQuery } from "@tanstack/react-query";
import { fetchWords } from "../ApiService/ApiService";
import { ReturnedWordType } from "../types/words.types";

export const useDictionary = (word: string) =>
  useQuery<ReturnedWordType[], Error>({
    queryKey: ["words", word],
    queryFn: () => fetchWords(word),
    enabled: !!word,
    retry: false,
  });
