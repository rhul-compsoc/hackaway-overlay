import React from "react";
import { DashboardContainer } from "../../components/DashboardContainer";
import { DataSheet } from "../../components/DataSheet";

const SidePopupPage = () => (
  <DashboardContainer>
    <DataSheet
      replicant="sidePopups"
      columns={["Enabled", "Duration", "Content"]}
    />
  </DashboardContainer>
);

export { SidePopupPage };
