import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteApplication = async ({ id }: { id: number }) => {
  const res = await fetch(`/applications/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message ?? "failed to delete application");
  }
};

export function useDeleteApplications() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}
