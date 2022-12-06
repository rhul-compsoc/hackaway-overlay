import React from "react";
import { EventsListPage } from "../eventsList";
import { LogoMark } from "../logoMark";
import { SidePopupPage } from "../sidePopup";
import { SpotifyPage } from "../spotify";
import { TimerPage } from "../timer";

const AllPage = () => (
  <div className="w-[1920px] h-[1080px] bg-blue-200">
    <div className="fixed">
      <SidePopupPage />
    </div>
    <div className="fixed">
      <LogoMark />
    </div>
    <div className="fixed right-7">
      <TimerPage />
    </div>
    <div className="fixed bottom-0">
      <SpotifyPage />
    </div>
    <div className="fixed top-32 bottom-[84px]">
      <EventsListPage />
    </div>
  </div>
);

export { AllPage };
