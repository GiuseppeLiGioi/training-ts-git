import { getQuote } from "@/api/quotesApi";
import { Quote } from "@/types/quote";
import { useState } from "react";

export default function useQuote() {
  const [quote, setQuote] = useState<Quote | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      const data: Quote = await getQuote();
      setQuote(data);
    } catch (error) {
      setError(typeof error === "string" ? error : (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { quote, loading, error, fetchQuote };
}
