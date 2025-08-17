import { _getPropertyModel as _getPropertyModel_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, NotBlank as NotBlank_1, StringModel as StringModel_1 } from "@vaadin/hilla-lit-form";
import AbstractEntityModel_1 from "../../base/domain/AbstractEntityModel.js";
import type ReferenceTable_1 from "./ReferenceTable.js";
class ReferenceTableModel<T extends ReferenceTable_1 = ReferenceTable_1> extends AbstractEntityModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(ReferenceTableModel);
    get code(): StringModel_1 {
        return this[_getPropertyModel_1]("code", (parent, key) => new StringModel_1(parent, key, true, { validators: [new NotBlank_1()], meta: { javaType: "java.lang.String" } }));
    }
    get description(): StringModel_1 {
        return this[_getPropertyModel_1]("description", (parent, key) => new StringModel_1(parent, key, true, { validators: [new NotBlank_1()], meta: { javaType: "java.lang.String" } }));
    }
    get category(): StringModel_1 {
        return this[_getPropertyModel_1]("category", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
}
export default ReferenceTableModel;
