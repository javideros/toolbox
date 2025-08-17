import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import type ReferenceTable_1 from "./com/example/application/reference/domain/ReferenceTable.js";
import client_1 from "./connect-client.default.js";
async function delete_1(id: number | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("ReferenceService", "delete", { id }, init); }
async function getTotalCount_1(init?: EndpointRequestInit_1): Promise<number> { return client_1.call("ReferenceService", "getTotalCount", {}, init); }
async function list_1(init?: EndpointRequestInit_1): Promise<Array<ReferenceTable_1 | undefined> | undefined> { return client_1.call("ReferenceService", "list", {}, init); }
async function save_1(entity: ReferenceTable_1 | undefined, init?: EndpointRequestInit_1): Promise<ReferenceTable_1 | undefined> { return client_1.call("ReferenceService", "save", { entity }, init); }
export { delete_1 as delete, getTotalCount_1 as getTotalCount, list_1 as list, save_1 as save };
