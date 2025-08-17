import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import type DashboardTile_1 from "./com/example/application/dashboard/domain/DashboardTile.js";
import client_1 from "./connect-client.default.js";
async function getAllTiles_1(init?: EndpointRequestInit_1): Promise<Array<DashboardTile_1 | undefined> | undefined> { return client_1.call("DashboardConfigService", "getAllTiles", {}, init); }
async function getAllTilesForAdmin_1(init?: EndpointRequestInit_1): Promise<Array<DashboardTile_1 | undefined> | undefined> { return client_1.call("DashboardConfigService", "getAllTilesForAdmin", {}, init); }
async function getTilesForDashboard_1(init?: EndpointRequestInit_1): Promise<Array<DashboardTile_1 | undefined> | undefined> { return client_1.call("DashboardConfigService", "getTilesForDashboard", {}, init); }
async function getTilesForMenu_1(init?: EndpointRequestInit_1): Promise<Array<DashboardTile_1 | undefined> | undefined> { return client_1.call("DashboardConfigService", "getTilesForMenu", {}, init); }
async function saveDashboardConfiguration_1(tiles: Array<DashboardTile_1 | undefined> | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("DashboardConfigService", "saveDashboardConfiguration", { tiles }, init); }
export { getAllTiles_1 as getAllTiles, getAllTilesForAdmin_1 as getAllTilesForAdmin, getTilesForDashboard_1 as getTilesForDashboard, getTilesForMenu_1 as getTilesForMenu, saveDashboardConfiguration_1 as saveDashboardConfiguration };
