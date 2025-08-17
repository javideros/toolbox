import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import type FunctionalArea_1 from "./com/example/application/functionalarea/domain/FunctionalArea.js";
import type Filter_1 from "./com/vaadin/hilla/crud/filter/Filter.js";
import type Pageable_1 from "./com/vaadin/hilla/mappedtypes/Pageable.js";
import client_1 from "./connect-client.default.js";
async function count_1(init?: EndpointRequestInit_1): Promise<number> { return client_1.call("FunctionalAreaService", "count", {}, init); }
async function exists_1(id: number, init?: EndpointRequestInit_1): Promise<boolean> { return client_1.call("FunctionalAreaService", "exists", { id }, init); }
async function get_1(id: number, init?: EndpointRequestInit_1): Promise<FunctionalArea_1 | undefined> { return client_1.call("FunctionalAreaService", "get", { id }, init); }
async function list_1(pageable: Pageable_1, filter: Filter_1 | undefined, init?: EndpointRequestInit_1): Promise<Array<FunctionalArea_1>> { return client_1.call("FunctionalAreaService", "list", { pageable, filter }, init); }
async function delete_1(id: number | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("FunctionalAreaService", "delete", { id }, init); }
async function deleteAll_1(ids: Array<number>, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("FunctionalAreaService", "deleteAll", { ids }, init); }
async function save_1(entity: FunctionalArea_1 | undefined, init?: EndpointRequestInit_1): Promise<FunctionalArea_1 | undefined> { return client_1.call("FunctionalAreaService", "save", { entity }, init); }
async function saveAll_1(values: Array<FunctionalArea_1>, init?: EndpointRequestInit_1): Promise<Array<FunctionalArea_1>> { return client_1.call("FunctionalAreaService", "saveAll", { values }, init); }
async function init_1(init?: EndpointRequestInit_1): Promise<void> { return client_1.call("FunctionalAreaService", "init", {}, init); }
async function listAll_1(init?: EndpointRequestInit_1): Promise<Array<FunctionalArea_1 | undefined> | undefined> { return client_1.call("FunctionalAreaService", "listAll", {}, init); }
export { count_1 as count, delete_1 as delete, deleteAll_1 as deleteAll, exists_1 as exists, get_1 as get, init_1 as init, list_1 as list, listAll_1 as listAll, save_1 as save, saveAll_1 as saveAll };
