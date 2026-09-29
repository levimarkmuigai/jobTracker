import type { Application } from "@jobTracker/schema";
import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";

const fetchApplications = async ({ signal }: QueryFunctionContext): Promise<Application[]> => {
  const response = await fetch("/applications", { signal });

  if (!response.ok) {
    throw new Error(`failed to fetch products:${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<Application[]>;
};

export function useFetchApplications() {
  return useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
    staleTime: 1000 * 60 * 5,
  });
}
