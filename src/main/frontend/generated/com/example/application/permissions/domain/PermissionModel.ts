import { _getPropertyModel as _getPropertyModel_1, BooleanModel as BooleanModel_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, NotBlank as NotBlank_1, StringModel as StringModel_1 } from "@vaadin/hilla-lit-form";
import AbstractEntityModel_1 from "../../base/domain/AbstractEntityModel.js";
import RoleModel_1 from "../../roles/domain/RoleModel.js";
import type Permission_1 from "./Permission.js";
class PermissionModel<T extends Permission_1 = Permission_1> extends AbstractEntityModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(PermissionModel);
    get role(): RoleModel_1 {
        return this[_getPropertyModel_1]("role", (parent, key) => new RoleModel_1(parent, key, true, { meta: { annotations: [{ name: "jakarta.persistence.ManyToOne" }] } }));
    }
    get screenName(): StringModel_1 {
        return this[_getPropertyModel_1]("screenName", (parent, key) => new StringModel_1(parent, key, true, { validators: [new NotBlank_1()], meta: { javaType: "java.lang.String" } }));
    }
    get canRead(): BooleanModel_1 {
        return this[_getPropertyModel_1]("canRead", (parent, key) => new BooleanModel_1(parent, key, false, { meta: { javaType: "boolean" } }));
    }
    get canWrite(): BooleanModel_1 {
        return this[_getPropertyModel_1]("canWrite", (parent, key) => new BooleanModel_1(parent, key, false, { meta: { javaType: "boolean" } }));
    }
}
export default PermissionModel;
