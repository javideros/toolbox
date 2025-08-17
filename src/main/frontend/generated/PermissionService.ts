import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import type Permission_1 from "./com/example/application/permissions/domain/Permission.js";
import type PermissionDto_1 from "./com/example/application/permissions/dto/PermissionDto.js";
import type Role_1 from "./com/example/application/roles/domain/Role.js";
import type Filter_1 from "./com/vaadin/hilla/crud/filter/Filter.js";
import type Pageable_1 from "./com/vaadin/hilla/mappedtypes/Pageable.js";
import client_1 from "./connect-client.default.js";
async function count_1(init?: EndpointRequestInit_1): Promise<number> { return client_1.call("PermissionService", "count", {}, init); }
async function exists_1(id: number, init?: EndpointRequestInit_1): Promise<boolean> { return client_1.call("PermissionService", "exists", { id }, init); }
async function get_1(id: number, init?: EndpointRequestInit_1): Promise<Permission_1 | undefined> { return client_1.call("PermissionService", "get", { id }, init); }
async function list_1(pageable: Pageable_1, filter: Filter_1 | undefined, init?: EndpointRequestInit_1): Promise<Array<Permission_1>> { return client_1.call("PermissionService", "list", { pageable, filter }, init); }
async function delete_1(id: number, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("PermissionService", "delete", { id }, init); }
async function deleteAll_1(ids: Array<number>, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("PermissionService", "deleteAll", { ids }, init); }
async function save_1(permission: Permission_1 | undefined, init?: EndpointRequestInit_1): Promise<Permission_1 | undefined> { return client_1.call("PermissionService", "save", { permission }, init); }
async function saveAll_1(values: Array<Permission_1>, init?: EndpointRequestInit_1): Promise<Array<Permission_1>> { return client_1.call("PermissionService", "saveAll", { values }, init); }
async function findByRole_1(role: Role_1 | undefined, init?: EndpointRequestInit_1): Promise<Array<Permission_1 | undefined> | undefined> { return client_1.call("PermissionService", "findByRole", { role }, init); }
async function findByRoleId_1(roleId: number | undefined, init?: EndpointRequestInit_1): Promise<Array<PermissionDto_1 | undefined> | undefined> { return client_1.call("PermissionService", "findByRoleId", { roleId }, init); }
async function savePermission_1(roleId: number | undefined, screenName: string | undefined, canRead: boolean, canWrite: boolean, init?: EndpointRequestInit_1): Promise<Permission_1 | undefined> { return client_1.call("PermissionService", "savePermission", { roleId, screenName, canRead, canWrite }, init); }
export { count_1 as count, delete_1 as delete, deleteAll_1 as deleteAll, exists_1 as exists, findByRole_1 as findByRole, findByRoleId_1 as findByRoleId, get_1 as get, list_1 as list, save_1 as save, saveAll_1 as saveAll, savePermission_1 as savePermission };
