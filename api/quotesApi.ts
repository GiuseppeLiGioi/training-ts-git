import { Quote } from "@/types/quote";

export const getQuote = async (): Promise<Quote> => {
  const res = await fetch("/api/quotes/random");

  if (!res.ok) {
    throw new Error("Errore nel fetch di una nuova citazione");
  }

  const data: Quote = await res.json();
  return data;
};
