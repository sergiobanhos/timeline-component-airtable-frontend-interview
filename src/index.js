import "./app.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Timeline } from "./components/ui/timeline/timeline.jsx";
import { Sidebar } from "./components/ui/sidebar.jsx";
import { useEvents } from "./hooks/use-events";
import { Button } from "./components/ui/button.jsx";
import { PlusIcon, DownloadIcon, ShareIcon } from "lucide-react";

function App() {
  const { events, handleEventsChange } = useEvents();

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="flex flex-row h-screen w-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 h-full overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex flex-row justify-between items-start">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">Project Timeline</h1>
                <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {events.length} events
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Last updated {formatDate(new Date())}
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ShareIcon className="w-4 h-4" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <DownloadIcon className="w-4 h-4" />
                Export
              </Button>
              <Button size="sm">
                <PlusIcon className="w-4 h-4" />
                Add Event
              </Button>
            </div>
          </div>
        </header>

        <div className="h-full overflow-hidden">
          <Timeline items={events} onItemsChange={handleEventsChange} />
        </div>
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);