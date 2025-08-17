import { _getPropertyModel as _getPropertyModel_1, ArrayModel as ArrayModel_1, BooleanModel as BooleanModel_1, Email as Email_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, NotBlank as NotBlank_1, Size as Size_1, StringModel as StringModel_1 } from "@vaadin/hilla-lit-form";
import AbstractEntityModel_1 from "../../base/domain/AbstractEntityModel.js";
import RoleModel_1 from "../../roles/domain/RoleModel.js";
import type User_1 from "./User.js";
class UserModel<T extends User_1 = User_1> extends AbstractEntityModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(UserModel);
    get username(): StringModel_1 {
        return this[_getPropertyModel_1]("username", (parent, key) => new StringModel_1(parent, key, true, { validators: [new NotBlank_1(), new Size_1({ max: 50 })], meta: { javaType: "java.lang.String" } }));
    }
    get fullName(): StringModel_1 {
        return this[_getPropertyModel_1]("fullName", (parent, key) => new StringModel_1(parent, key, true, { validators: [new NotBlank_1(), new Size_1({ max: 100 })], meta: { javaType: "java.lang.String" } }));
    }
    get email(): StringModel_1 {
        return this[_getPropertyModel_1]("email", (parent, key) => new StringModel_1(parent, key, true, { validators: [new Email_1(), new Size_1({ max: 100 })], meta: { javaType: "java.lang.String" } }));
    }
    get roles(): ArrayModel_1<RoleModel_1> {
        return this[_getPropertyModel_1]("roles", (parent, key) => new ArrayModel_1(parent, key, true, (parent, key) => new RoleModel_1(parent, key, true), { meta: { annotations: [{ name: "jakarta.persistence.ManyToMany" }], javaType: "java.util.Set" } }));
    }
    get active(): BooleanModel_1 {
        return this[_getPropertyModel_1]("active", (parent, key) => new BooleanModel_1(parent, key, false, { meta: { javaType: "boolean" } }));
    }
}
export default UserModel;
