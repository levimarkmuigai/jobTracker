import type { Application } from "@jobTracker/schema";
import { STATUSES, statusConfig } from "./status";

export function ApplicationsBoard({
  applications,
  onSelect,
}: {
  applications: Application[];
  onSelect: (a: Application) => void;
}) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {STATUSES.map((status) => {
        const columnApps = applications.filter((a) => a.status === status);
        return (
          <div key={status} className="w-64 flex-shrink-0">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-sm font-medium text-ink">{statusConfig[status].label}</span>
              <span className="text-xs text-muted">{columnApps.length}</span>
            </div>
            <div className="space-y-2">
              {columnApps.map((application) => (
                <button
                  key={application.id}
                  onClick={() => onSelect(application)}
                  className="w-full rounded-md border border-line bg-white p-3 text-left hover:border-accent"
                >
                  <p className="text-sm font-medium text-ink">{application.company}</p>
                  <p className="text-sm text-muted">{application.role}</p>
                </button>
              ))}
              {columnApps.length === 0 && (
                <div className="rounded-md border border-dashed border-line py-6 text-center text-xs text-muted">
                  Empty
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
