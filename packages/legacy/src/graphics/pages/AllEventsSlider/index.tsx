import React, { useEffect, useRef } from "react";
import { useReplicant, useSpreadsheet } from "use-nodecg";
import classnames from "classnames";

const Event = ({
  index,
  event,
  selected,
  hidden,
}: {
  index: number;
  event: [string, string, string, string];
  selected: boolean;
  hidden: boolean;
}) => {
  const [time, name, description, image] = event;

  return (
    <div
      className="flex flex-col gap-2 shrink-0 text-white"
      id={`event-${index}`}
    >
      <div>
        <div className="flex flex-col h-12 justify-end">
          <p
            className={classnames(
              "transition-font-size duration-1000 text-2xl font-bold whitespace-nowrap overflow-hidden",
              {
                "!text-4xl": selected,
              }
            )}
          >
            {name}
          </p>
        </div>
        <div className="flex flex-col h-8 justify-start">
          <p
            className={classnames(
              "transition-font-size duration-1000 text-xl font-bold whitespace-nowrap overflow-hidden",
              {
                "!text-2xl": selected,
              }
            )}
          >
            {description} - {time}
          </p>
        </div>
      </div>
      <img
        className={classnames(
          "object-cover transition-size ease-in-out duration-1000",
          {
            "!h-[300px] !w-[660px]": selected,
            "!mr-[120px]": hidden,
          },
          "mr-0 h-[200px] w-[500px]"
        )}
        src={image}
      />
    </div>
  );
};

const AllEventsSlider = () => {
  const [events] = useSpreadsheet("events", "matrix", 4);
  const [currentEventId] = useReplicant<number>("event", 0);

  useEffect(() => {
    const parent = document.querySelector<HTMLDivElement>("#events");
    const element = document.querySelector<HTMLDivElement>(
      `#event-${currentEventId}`
    );

    let animationFrame: number | undefined;
    const start = Date.now();
    const duration = 1000;

    if (parent && element) {
      const startX = parent.scrollLeft;
      const destinationX = currentEventId * (500 + 150);
      const differenceX = destinationX - startX;

      const frame = () => {
        const elapsed = Date.now() - start;
        const completion = elapsed / duration;

        const newX =
          startX + differenceX * ((-Math.cos(completion * Math.PI) + 1) / 2);

        parent.scrollTo({ left: newX });

        console.log({
          startX,
          destinationX,
          differenceX,
          elapsed,
          completion,
          newX,
        });

        if (completion < 1) animationFrame = requestAnimationFrame(frame);
      };

      animationFrame = requestAnimationFrame(frame);
    }

    return () => {
      if (typeof animationFrame === "number")
        cancelAnimationFrame(animationFrame);
    };
  }, [currentEventId]);

  return (
    <div id="events" className="flex gap-[30px] overflow-x-hidden w-screen">
      <div className="w-[60px] shrink-0"></div>
      {events.map((event, index) => (
        <Event
          key={index}
          index={index}
          event={event}
          selected={index === currentEventId}
          hidden={index < currentEventId}
        />
      ))}
      <div className="w-screen shrink-0"></div>
    </div>
  );
};

export { AllEventsSlider };
