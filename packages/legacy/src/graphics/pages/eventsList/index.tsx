import React, { useEffect } from "react";
import { useReplicant, useSpreadsheet } from "use-nodecg";
import { EventCard } from "./EventCard";

const EventsListPage = () => {
  const [events] = useSpreadsheet("events", "matrix", 4);
  const [selectedEvent] = useReplicant<number>("event", 0);

  useEffect(() => {
    const element = document.getElementById(`event-${selectedEvent}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedEvent]);

  return (
    <main className="bg-hackaway-grey grid px-3 w-80 h-full overflow-hidden">
      {events?.map((event, index) => (
        <EventCard
          currentEventIndex={selectedEvent}
          index={index}
          event={event}
          key={index}
        />
      ))}
      <div className="h-screen"></div>
    </main>
  );
};

export { EventsListPage };
