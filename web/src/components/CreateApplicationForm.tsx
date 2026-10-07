import { toast } from "sonner";
import { useCreateApplications } from "../hooks/useCreateApplications";
import { STATUSES, statusConfig, fromDateInputValue, type Status } from "./status";

export function CreateApplicationForm({ onClose }: { onClose: () => void }) {
  const createApplication = useCreateApplications();

  const inputClass =
    "w-full rounded-md border border-line bg-white px-3 py-1.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const company = String(form.get("company") ?? "").trim();
        const role = String(form.get("role") ?? "").trim();

        if (!company || !role) {
          toast.error("Company and role are required.");
          return;
        }

        try {
          await createApplication.mutateAsync({
            applicationData: {
              company,
              role,
              status: (form.get("status") as Status) ?? "applied",
              dateApplied: fromDateInputValue(form.get("dateApplied") as string),
              link: String(form.get("link") ?? "").trim(),
              source: String(form.get("source") ?? "").trim(),
              nextAction: "",
              nextActionDate: null,
              notes: String(form.get("notes") ?? "").trim(),
            },
          });
          toast.success(`Added ${company}`);
          onClose();
        } catch (err) {
          toast.error(err instanceof Error ? err.message : "Failed to add application");
        }
      }}
    >
      <input name="company" placeholder="Company" required autoFocus className={inputClass} />
      <input name="role" placeholder="Role" required className={inputClass} />
      <select name="status" defaultValue="applied" className={inputClass}>
        {STATUSES.map((status) => (
          <option key={status} value={status}>
            {statusConfig[status].label}
          </option>
        ))}
      </select>
      <input name="dateApplied" type="date" className={inputClass} />
      <input name="link" type="url" placeholder="Listing link" className={inputClass} />
      <input name="source" placeholder="Source" className={inputClass} />
      <textarea name="notes" rows={3} placeholder="Notes" className={inputClass} />

      <div className="flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink hover:bg-paper"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={createApplication.isPending}
          className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-60"
        >
          {createApplication.isPending ? "Adding…" : "Add application"}
        </button>
      </div>
    </form>
  );
}
