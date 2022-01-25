import React, { Component } from "react";
import { Event } from "../../../class/Event";

interface EventCardProps {
  event: Event;
  index: number;
  currentEventIndex: number;
}

interface EventCardState {
  show: boolean;
}

class EventCard extends Component<EventCardProps, EventCardState> {
  container = React.createRef<HTMLDivElement>();
  animationFrame?: number;

  constructor(props: EventCardProps) {
    super(props);

    this.state = {
      show: false,
    };
    this.check = this.check.bind(this);
  }

  componentDidMount() {
    this.animationFrame = requestAnimationFrame(this.check);
  }

  componentWillUnmount() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
  }

  check() {
    const div = this.container.current;

    if (div && div.parentElement) {
      const thisBounds = div.getBoundingClientRect();
      const parentBounds = div.parentElement.getBoundingClientRect();

      this.setState({
        show:
          thisBounds.y + thisBounds.height <
          parentBounds.y + parentBounds.height,
      });
    }

    requestAnimationFrame(this.check);
  }

  render() {
    const { event, index, currentEventIndex } = this.props;

    return (
      <div
        id={event.id}
        ref={this.container}
        className={this.state.show ? "animate-appear" : "invisible"}
      >
        <article
          className={`transition-colors rounded mt-3 p-3 drop-shadow ${
            index < currentEventIndex ? "bg-gray-50 text-gray-500" : ""
          }${index === currentEventIndex ? "bg-gray-300" : ""}${
            index > currentEventIndex ? "bg-gray-100" : ""
          }`}
        >
          {index === currentEventIndex && <div>Current event:</div>}
          {index === currentEventIndex + 1 && <div>Next up:</div>}
          <div>
            {event.time && (
              <span className="whitespace-nowrap float-right">
                {event.time}
              </span>
            )}
            {event.name && (
              <span className="text-xl font-bold">{event.name}</span>
            )}
          </div>
          {event.description && (
            <div className="text-lg">{event.description}</div>
          )}
        </article>
      </div>
    );
  }
}

export { EventCard };
