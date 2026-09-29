import { toast } from "sonner";
import type { Application } from "@jobTracker/schema";
import { useUpdateApplications } from "../hooks/useUpdateApplications";
import { useDeleteApplications } from "../hooks/useDeleteApplications";
import { STATUSES, statusConfig, toDateInputValue, fromDateInputValue } from "./status";

export function UpdateApplicationForm({
  application,
  onClose,
}: {
  application: Application;
  onClose: () => void;
}) {
  const updateApplication = useUpdateApplications();
  const deleteApplication = useDeleteApplications();

  const inputClass =
    "w-full rounded-md border border-line bg-white px-3 py-1.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

  async function handleDelete() {
    if (
      !window.confirm(`Delete the application for ${application.role} at ${application.company}?`)
    )
      return;

    try {
      await deleteApplication.mutateAsync({ id: application.id });
      toast.success("Application deleted");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete application");
    }
  }

  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        try {
          await updateApplication.mutateAsync({
            id: application.id,
            updateData: {
              status: form.get("status") as Application["status"],
              nextAction: String(form.get("nextAction") ?? "").trim(),
              nextActionDate: fromDateInputValue(form.get("nextActionDate") as string) || null,
              notes: String(form.get("notes") ?? "").trim(),
            },
          });
          toast.success("Changes saved");
          onClose();
        } catch (err) {
          toast.error(err instanceof Error ? err.message : "Failed to save changes");
        }
      }}
    >
      <div className="mb-1 rounded-md bg-paper px-3 py-2 text-sm">
        <p className="font-medium text-ink">
          {application.role} · {application.company}
        </p>
      </div>

      <select name="status" defaultValue={application.status} className={inputClass}>
        {STATUSES.map((status) => (
          <option key={status} value={status}>
            {statusConfig[status].label}
          </option>
        ))}
      </select>
      <input
        name="nextAction"
        placeholder="Next action"
        defaultValue={application.nextAction ?? ""}
        className={inputClass}
      />
      <input
        name="nextActionDate"
        type="date"
        defaultValue={toDateInputValue(application.nextActionDate)}
        className={inputClass}
      />
      <textarea
        name="notes"
        rows={3}
        placeholder="Notes"
        defaultValue={application.notes ?? ""}
        className={inputClass}
      />

      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={handleDelete}
          className="text-sm font-medium text-danger hover:underline"
        >
          Delete
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink hover:bg-paper"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updateApplication.isPending}
            className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-60"
          >
            {updateApplication.isPending ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </form>
  );
}
