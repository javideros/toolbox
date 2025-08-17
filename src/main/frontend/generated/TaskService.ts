import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import type Task_1 from "./com/example/application/taskmanagement/domain/Task.js";
import type Pageable_1 from "./com/vaadin/hilla/mappedtypes/Pageable.js";
import client_1 from "./connect-client.default.js";
async function createTask_1(description: string, dueDate: string | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("TaskService", "createTask", { description, dueDate }, init); }
async function list_1(pageable: Pageable_1, init?: EndpointRequestInit_1): Promise<Array<Task_1>> { return client_1.call("TaskService", "list", { pageable }, init); }
export { createTask_1 as createTask, list_1 as list };
