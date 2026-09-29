import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ApplicationsView } from "./components/ApplicationsView";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationsView />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
