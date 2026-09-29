import type { Application } from "@jobTracker/schema";
import { StatusBadge } from "./StatusBadge";

export function ApplicationsTable({
  applications,
  onSelect,
}: {
  applications: Application[];
  onSelect: (a: Application) => void;
}) {
  if (applications.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-line py-16 text-center text-sm text-muted">
        No applications yet. Add one to start tracking.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line text-left text-muted">
            <th className="px-4 py-2 font-medium">Company</th>
            <th className="px-4 py-2 font-medium">Role</th>
            <th className="px-4 py-2 font-medium">Status</th>
            <th className="px-4 py-2 font-medium">Applied</th>
            <th className="px-4 py-2 font-medium">Next action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr
              key={application.id}
              onClick={() => onSelect(application)}
              className="cursor-pointer border-b border-line last:border-0 hover:bg-paper"
            >
              <td className="px-4 py-3 font-medium text-ink">{application.company}</td>
              <td className="px-4 py-3 text-ink">{application.role}</td>
              <td className="px-4 py-3">
                <StatusBadge status={application.status} />
              </td>
              <td className="px-4 py-3 text-muted">
                {application.dateApplied
                  ? new Date(application.dateApplied).toLocaleDateString()
                  : "—"}
              </td>
              <td className="px-4 py-3 text-muted">{application.nextAction || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
