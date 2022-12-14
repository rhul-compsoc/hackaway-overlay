import classNames from "classnames";
import React, { useEffect, useState } from "react";
import Spreadsheet from "react-spreadsheet";
import { useReplicant } from "use-nodecg";
import { EventsListDto } from "../../../types";

const EventsListPage = () => {
  const [isLatestCopy, setIsLatestCopy] = useState<boolean>(true);
  const [eventsCache, setEventsCache] = useState<EventsListDto>([
    [{ value: "" }, { value: "" }, { value: "" }],
  ]);
  const [events, setEvents] = useReplicant<EventsListDto, EventsListDto>(
    "events",
    [[{ value: "" }, { value: "" }, { value: "" }]]
  );

  useEffect(() => {
    console.log("change", events);

    if (events) {
      setEventsCache(events.filter((x) => x.every((y) => y !== null)));
    } else {
      setEventsCache([[{ value: "" }, { value: "" }, { value: "" }]]);
    }
    setIsLatestCopy(true);
  }, [events]);

  return (
    <div className="p-2">
      <div className="w-full overflow-x-auto">
        <Spreadsheet
          className="min-w-full"
          data={eventsCache}
          onChange={(newEvents) => {
            setIsLatestCopy(false);
            setEventsCache(newEvents);
          }}
          columnLabels={["Time", "Name", "Description"]}
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            setEvents(eventsCache);
          }}
          className={classNames("p-2 rounded text-center bg-blue-500", {
            "bg-blue-900 cursor-not-allowed": isLatestCopy,
          })}
        >
          Save
        </button>
        <button
          onClick={() => {
            setIsLatestCopy(false);
            setEventsCache([
              ...eventsCache,
              [{ value: "" }, { value: "" }, { value: "" }],
            ]);
          }}
          className="p-2 rounded text-center bg-blue-500"
        >
          Add Row
        </button>
        <button
          onClick={() => {
            setIsLatestCopy(false);
            setEventsCache(eventsCache.slice(0, -1));
          }}
          className={classNames("p-2 rounded text-center bg-blue-500", {
            "bg-blue-900 cursor-not-allowed": eventsCache.length === 0,
          })}
        >
          Remove Row
        </button>
      </div>
    </div>
  );
};

// class EventsListPage extends Component<{}, EventsPageState> {
//   textarea = React.createRef<HTMLTextAreaElement>();
//   state = {
//     events: "",
//   };

//   constructor(props: any) {
//     super(props);

//     this.eventsChange = this.eventsChange.bind(this);
//     this.setEvents = this.setEvents.bind(this);
//   }

//   componentDidMount() {
//     eventsReplicant.on("change", (value) => {
//       this.setState({
//         events: value,
//       });
//     });
//   }

//   setEvents() {
//     eventsReplicant.value = this.textarea.current?.value;
//   }

//   eventsChange(e: ChangeEvent<HTMLTextAreaElement>) {
//     this.setState({
//       events: e.target.value,
//     });
//   }

//   render(): React.ReactNode {
//     return (
//       <div className="p-2">
//         <p>
//           List of events, formatted as a semi-colon delimited format. Keep IDs
//           unique, for event picker to function.
//           <br />
//           <code>ID;Time;Name;Description</code>
//         </p>
//         <textarea
//           onChange={this.eventsChange}
//           ref={this.textarea}
//           value={this.state.events}
//           className="p-1 w-full rounded text-black"
//         />
//         <br />
//         <button
//           className="bg-blue-500 p-2 rounded text-center"
//           onClick={this.setEvents}
//         >
//           Set list of events
//         </button>
//       </div>
//     );
//   }
// }

export { EventsListPage };
