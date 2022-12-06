import React, { useEffect } from "react";
import { useReplicant } from "use-nodecg";
import { EventsListDto } from "../../../types";
import { EventCard } from "./EventCard";

const EventsListPage = () => {
  const [events] = useReplicant<EventsListDto, EventsListDto>("events", []);
  const [selectedEvent] = useReplicant<number, number>("event", 0);

  useEffect(() => {
    const element = document.getElementById(`event-${selectedEvent}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedEvent]);

  return (
    <main className="bg-hackaway-grey grid px-3 w-80 h-full overflow-hidden">
      {events.map((event, index) => (
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

// const eventsReplicant = nodecg.Replicant("events");
// const eventReplicant = nodecg.Replicant<string>("event");

// class EventsListPage extends Component<{}, EventsPageState> {
//   state = {
//     events: "",
//     event: "",
//   };

//   constructor(props: any) {
//     super(props);
//   }

//   componentDidMount() {
//     eventsReplicant.on("change", (value) => {
//       this.setState({
//         events: value,
//       });
//     });

//     eventReplicant.on("change", (value) => {
//       this.setState({
//         event: value,
//       });

//       const element = document.getElementById(value);
//       if (element) {
//         element.scrollIntoView({ behavior: "smooth" });
//       }
//     });
//   }

//   render(): React.ReactNode {
//     const events = Event.parse(this.state.events);

//     let currentEventIndex = events.findIndex(
//       (event) => event.id === this.state.event
//     );

//     return (
//       <main className="bg-hackaway-grey grid px-3 w-80 h-full overflow-hidden">
//         {events.map((event, index) => (
//           <EventCard
//             currentEventIndex={currentEventIndex}
//             index={index}
//             event={event}
//             key={event.id}
//           />
//         ))}
//         <div className="h-screen"></div>
//       </main>
//     );
//   }
// }

export { EventsListPage };
