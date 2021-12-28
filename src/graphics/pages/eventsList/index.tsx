import React, { Component } from "react";
import { Event } from "../../../class/Event";

interface EventsPageState {
  events: string;
  event: string;
}

const eventsReplicant = nodecg.Replicant("events", {
  defaultValue: "08:00;Livestream Begins;Something else",
});
const eventReplicant = nodecg.Replicant<string>("event");

class EventsListPage extends Component<{}, EventsPageState> {
  state = {
    events: "",
    event: "",
  };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    eventsReplicant.on("change", (value) => {
      this.setState({
        events: value,
      });
    });

    eventReplicant.on("change", (value) => {
      this.setState({
        event: value,
      });

      const element = document.getElementById(value);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  render(): React.ReactNode {
    const events = Event.parse(this.state.events);

    let currentEventIndex = events.findIndex(
      (event) => event.id === this.state.event
    );

    return (
      <main className="bg-hackaway-grey grid px-3 pb-3 w-80">
        {events.map((event, index) => (
          <div key={event.id} id={event.id}>
            <article
              className={`transition-colors rounded mt-3 p-3 drop-shadow ${
                index < currentEventIndex ? "bg-gray-50 text-gray-500" : ""
              }${index === currentEventIndex ? "bg-gray-300" : ""}${
                index > currentEventIndex ? "bg-gray-100" : ""
              }`}
            >
              {index === currentEventIndex && <div>Current event:</div>}
              {index === currentEventIndex + 1 && <div>Next up:</div>}
              <div className="text-xl">
                {event.name && <span className="font-bold">{event.name}</span>}
                {event.time && (
                  <span className="whitespace-nowrap"> @ {event.time}</span>
                )}
              </div>
              {event.description && (
                <div className="text-lg">{event.description}</div>
              )}
            </article>
          </div>
        ))}
      </main>
    );
  }
}

export { EventsListPage };
