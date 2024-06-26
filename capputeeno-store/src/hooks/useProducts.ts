import { ProductsFecthResponse } from "@/types/productsResponse";
import { generateQuery } from "@/utils/graphqlFilters";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { useDeferredValue } from "react";
import { useFilter } from "./useFilter";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const fetchProducts = (query: string): AxiosPromise<ProductsFecthResponse> => {
  return axios.post(API_URL, {
    query,
  });
};

export default function useProducts() {
  const { type, sort, search } = useFilter();
  const searchDeffered = useDeferredValue(search);
  const query = generateQuery(type, sort);
  const { data } = useQuery({
    queryFn: () => fetchProducts(query),
    queryKey: ["products", type, sort],
    staleTime: 1000 * 60 * 1,
  });

  const products = data?.data?.data?.allProducts;
  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchDeffered.toLowerCase())
  );

  return {
    data: filteredProducts,
  };
}
