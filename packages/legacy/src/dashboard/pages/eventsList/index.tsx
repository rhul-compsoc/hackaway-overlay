import React from "react";
import { DashboardContainer } from "../../components/DashboardContainer";
import { DataSheet } from "../../components/DataSheet";

const EventsListPage = () => (
  <DashboardContainer>
    <DataSheet
      replicant="events"
      columns={["Time", "Name", "Description", "Image"]}
    />
  </DashboardContainer>
);

export { EventsListPage };
