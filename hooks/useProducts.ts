import useSWR, { SWRConfiguration } from "swr";
import { IProduct } from "../interfaces/products";

interface Results {
  products: Array<IProduct>;
  isLoading: boolean;
  isError: boolean;
}

// const fetcher = (...args: [key: string]) => fetch(...args).then((res) => res.json());

export const useProducts = (url: string, config: SWRConfiguration = {}): Results => {
  // const { data, error } = useSWR<Array<IProduct>>(`/api${url}`, fetcher, {});
  const { data, error } = useSWR<Array<IProduct>>(`/api${url}`, {});

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
