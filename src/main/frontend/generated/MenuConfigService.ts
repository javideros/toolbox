import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import type DashboardTile_1 from "./com/example/application/dashboard/domain/DashboardTile.js";
import client_1 from "./connect-client.default.js";
async function getMenuItems_1(init?: EndpointRequestInit_1): Promise<Array<DashboardTile_1 | undefined> | undefined> { return client_1.call("MenuConfigService", "getMenuItems", {}, init); }
export { getMenuItems_1 as getMenuItems };
