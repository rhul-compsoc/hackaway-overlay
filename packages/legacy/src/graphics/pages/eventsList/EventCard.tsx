import React, { Component } from "react";
import { EventDto } from "../../../types";

interface EventCardProps {
  event: EventDto;
  index: number;
  currentEventIndex: number | null;
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
    const [time, name, description] = event;

    return (
      <div
        id={`event-${index}`}
        ref={this.container}
        className={this.state.show ? "animate-appear" : "invisible"}
      >
        {currentEventIndex !== null && (
          <>
            {index === currentEventIndex && (
              <div className="text-white text-2xl mt-5">Current event:</div>
            )}
            {index === currentEventIndex + 1 && (
              <div className="text-white text-2xl mt-5">Next up:</div>
            )}
          </>
        )}
        <article
          className={`transition-colors rounded mt-3 p-3 drop-shadow ${
            currentEventIndex !== null && index < currentEventIndex
              ? "bg-gray-50 text-gray-500"
              : ""
          }${
            currentEventIndex !== null && index === currentEventIndex
              ? "bg-gray-300"
              : ""
          }${
            currentEventIndex !== null && index > currentEventIndex
              ? "bg-gray-100"
              : ""
          }`}
        >
          <div>
            {time && (
              <span className="whitespace-nowrap float-right">{time}</span>
            )}
            {name && <span className="text-xl font-bold">{name}</span>}
          </div>
          {description && <div className="text-lg">{description}</div>}
        </article>
      </div>
    );
  }
}

export { EventCard };
