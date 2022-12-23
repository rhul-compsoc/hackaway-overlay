import React, { ReactNode } from "react";

/**
 * Root element for NodeCG Dashboard items.
 *
 * @returns A wrapper to pad the contents of Dashboard inputs
 */
const DashboardContainer = ({ children }: { children: ReactNode }) => (
  <div className="p-2">{children}</div>
);

export { DashboardContainer };
