import { marked } from "marked";
import React, { useEffect, useMemo, useState } from "react";
import { useSpreadsheet } from "use-nodecg";

const SidePopupPage = () => {
  const [popups] = useSpreadsheet("sidePopups", "matrix", 3);
  const [popupIndex, setPopupIndex] = useState<number>(0);

  const filteredPopups = popups.map((x, i) => ({ id: i, popup: x }));

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (filteredPopups.length) {
      const [_, duration] = filteredPopups[popupIndex ?? 0].popup;

      const parsedDuration = parseInt(duration, 10);
      let waitDuration =
        !parsedDuration || isNaN(parsedDuration) ? 500 : parsedDuration;

      timeout = setTimeout(() => {
        setPopupIndex(((popupIndex ?? 0) + 1) % filteredPopups.length);
      }, waitDuration);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [popups]);

  const queueArray = [
    ...filteredPopups.slice(popupIndex),
    ...filteredPopups.slice(0, popupIndex),
  ];

  return (
    <div className="opacity-80">
      {queueArray.map((data, index, slicedArray) => {
        const [_, __, content] = data.popup;
        return (
          <div
            key={data.id}
            className={`h-24 p-2 bg-hackaway-grey absolute top-0 left-0 w-full ${
              index === slicedArray.length - 1 ? "animate-slide-from-left" : ""
            }${index === 0 ? "animate-darken" : ""}`}
            style={{
              clipPath: "polygon(0 0, calc(100% - 3rem) 0, 100% 100%, 0 100%)",
            }}
          >
            <div
              className="h-24 w-full float-left"
              style={{
                shapeOutside: "polygon(0 0, 733px 0, 763px 100%, 0 100%)",
              }}
            ></div>
            <p
              className="text-white relative top-1/2 -translate-y-1/2 -translate-x-2.5 pr-4"
              dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
            ></p>
          </div>
        );
      })}
    </div>
  );
};

export { SidePopupPage };
