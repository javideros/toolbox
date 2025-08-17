import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import client_1 from "./connect-client.default.js";
async function getAppName_1(init?: EndpointRequestInit_1): Promise<string | undefined> { return client_1.call("AppConfigService", "getAppName", {}, init); }
export { getAppName_1 as getAppName };
