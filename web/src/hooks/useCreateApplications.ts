import { z } from "zod";
import { insertApplicationSchema } from "@jobTracker/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ApplicationData = z.infer<typeof insertApplicationSchema>;

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ applicationData }: { applicationData: ApplicationData }) => {
      const res = await fetch("/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });

      if (!res.ok) throw new Error("failed to save application");

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}
