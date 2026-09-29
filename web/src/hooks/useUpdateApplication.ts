import type { updateApplicationSchema } from "@jobTracker/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type z from "zod";

type UpdateData = z.infer<typeof updateApplicationSchema>;

const updateApplications = async ({ updateData, id }: { updateData: UpdateData; id: number }) => {
  const res = await fetch(`/applications/:${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message ?? "failed to update application");
  }

  return res.json();
};

export function useUpdateApplications() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateApplications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}
