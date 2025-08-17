import { _getPropertyModel as _getPropertyModel_1, BooleanModel as BooleanModel_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, NumberModel as NumberModel_1, ObjectModel as ObjectModel_1, StringModel as StringModel_1 } from "@vaadin/hilla-lit-form";
import type PermissionDto_1 from "./PermissionDto.js";
class PermissionDtoModel<T extends PermissionDto_1 = PermissionDto_1> extends ObjectModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(PermissionDtoModel);
    get id(): NumberModel_1 {
        return this[_getPropertyModel_1]("id", (parent, key) => new NumberModel_1(parent, key, true, { meta: { javaType: "java.lang.Long" } }));
    }
    get roleId(): NumberModel_1 {
        return this[_getPropertyModel_1]("roleId", (parent, key) => new NumberModel_1(parent, key, true, { meta: { javaType: "java.lang.Long" } }));
    }
    get roleName(): StringModel_1 {
        return this[_getPropertyModel_1]("roleName", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get screenName(): StringModel_1 {
        return this[_getPropertyModel_1]("screenName", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get canRead(): BooleanModel_1 {
        return this[_getPropertyModel_1]("canRead", (parent, key) => new BooleanModel_1(parent, key, false, { meta: { javaType: "boolean" } }));
    }
    get canWrite(): BooleanModel_1 {
        return this[_getPropertyModel_1]("canWrite", (parent, key) => new BooleanModel_1(parent, key, false, { meta: { javaType: "boolean" } }));
    }
}
export default PermissionDtoModel;
