import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import type Role_1 from "./com/example/application/roles/domain/Role.js";
import type RoleDto_1 from "./com/example/application/roles/dto/RoleDto.js";
import type Filter_1 from "./com/vaadin/hilla/crud/filter/Filter.js";
import type Pageable_1 from "./com/vaadin/hilla/mappedtypes/Pageable.js";
import client_1 from "./connect-client.default.js";
async function count_1(init?: EndpointRequestInit_1): Promise<number> { return client_1.call("RoleService", "count", {}, init); }
async function exists_1(id: number, init?: EndpointRequestInit_1): Promise<boolean> { return client_1.call("RoleService", "exists", { id }, init); }
async function get_1(id: number, init?: EndpointRequestInit_1): Promise<Role_1 | undefined> { return client_1.call("RoleService", "get", { id }, init); }
async function list_1(pageable: Pageable_1, filter: Filter_1 | undefined, init?: EndpointRequestInit_1): Promise<Array<Role_1>> { return client_1.call("RoleService", "list", { pageable, filter }, init); }
async function delete_1(id: number, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("RoleService", "delete", { id }, init); }
async function deleteAll_1(ids: Array<number>, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("RoleService", "deleteAll", { ids }, init); }
async function save_1(value: Role_1, init?: EndpointRequestInit_1): Promise<Role_1 | undefined> { return client_1.call("RoleService", "save", { value }, init); }
async function saveAll_1(values: Array<Role_1>, init?: EndpointRequestInit_1): Promise<Array<Role_1>> { return client_1.call("RoleService", "saveAll", { values }, init); }
async function findByName_1(name: string | undefined, init?: EndpointRequestInit_1): Promise<Role_1 | undefined> { return client_1.call("RoleService", "findByName", { name }, init); }
async function getAllRoles_1(init?: EndpointRequestInit_1): Promise<Array<RoleDto_1 | undefined> | undefined> { return client_1.call("RoleService", "getAllRoles", {}, init); }
export { count_1 as count, delete_1 as delete, deleteAll_1 as deleteAll, exists_1 as exists, findByName_1 as findByName, get_1 as get, getAllRoles_1 as getAllRoles, list_1 as list, save_1 as save, saveAll_1 as saveAll };
