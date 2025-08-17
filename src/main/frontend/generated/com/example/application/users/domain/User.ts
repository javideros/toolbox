import type AbstractEntity_1 from "../../base/domain/AbstractEntity.js";
import type Role_1 from "../../roles/domain/Role.js";
interface User extends AbstractEntity_1 {
    username?: string;
    fullName?: string;
    email?: string;
    roles?: Array<Role_1 | undefined>;
    active: boolean;
}
export default User;
