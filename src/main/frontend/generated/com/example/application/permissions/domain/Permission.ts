import type AbstractEntity_1 from "../../base/domain/AbstractEntity.js";
import type Role_1 from "../../roles/domain/Role.js";
interface Permission extends AbstractEntity_1 {
    role?: Role_1;
    screenName?: string;
    canRead: boolean;
    canWrite: boolean;
}
export default Permission;
