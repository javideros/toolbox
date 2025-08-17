import { _getPropertyModel as _getPropertyModel_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, NotBlank as NotBlank_1, Size as Size_1, StringModel as StringModel_1 } from "@vaadin/hilla-lit-form";
import AbstractEntityModel_1 from "../../base/domain/AbstractEntityModel.js";
import type Role_1 from "./Role.js";
class RoleModel<T extends Role_1 = Role_1> extends AbstractEntityModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(RoleModel);
    get name(): StringModel_1 {
        return this[_getPropertyModel_1]("name", (parent, key) => new StringModel_1(parent, key, true, { validators: [new NotBlank_1(), new Size_1({ max: 50 })], meta: { javaType: "java.lang.String" } }));
    }
    get description(): StringModel_1 {
        return this[_getPropertyModel_1]("description", (parent, key) => new StringModel_1(parent, key, true, { validators: [new Size_1({ max: 255 })], meta: { javaType: "java.lang.String" } }));
    }
}
export default RoleModel;
