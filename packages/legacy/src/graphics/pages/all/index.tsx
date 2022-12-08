import React from "react";
import { EventsListPage } from "../eventsList";
import { LogoMark } from "../logoMark";
import { SidePopupPage } from "../sidePopup";
import { SpotifyPage } from "../spotify";
import { TimerPage } from "../timer";

const AllPage = () => (
  <div className="relative w-[1920px] h-[1080px] bg-blue-200">
    <SidePopupPage />
    <LogoMark />
    <TimerPage />
    <SpotifyPage />
    <div className="absolute top-32 bottom-[84px]">
      <EventsListPage />
    </div>
  </div>
);

export { AllPage };
