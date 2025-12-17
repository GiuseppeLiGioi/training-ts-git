import { quotes } from "@/mock/quotes";
import { Quote } from "@/types/quote";

export const getQuote = async (): Promise<Quote> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const fail = Math.random() < 0.2;

      if (fail) {
        reject("errore simulato nel fetch citazione");
      } else {
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        resolve(random);
      }
    }, 1000);
  });
};
