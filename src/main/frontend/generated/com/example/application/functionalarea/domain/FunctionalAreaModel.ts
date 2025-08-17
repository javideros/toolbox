import { _getPropertyModel as _getPropertyModel_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, NotBlank as NotBlank_1, Size as Size_1, StringModel as StringModel_1 } from "@vaadin/hilla-lit-form";
import AbstractEntityModel_1 from "../../base/domain/AbstractEntityModel.js";
import type FunctionalArea_1 from "./FunctionalArea.js";
class FunctionalAreaModel<T extends FunctionalArea_1 = FunctionalArea_1> extends AbstractEntityModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(FunctionalAreaModel);
    get name(): StringModel_1 {
        return this[_getPropertyModel_1]("name", (parent, key) => new StringModel_1(parent, key, true, { validators: [new NotBlank_1()], meta: { javaType: "java.lang.String" } }));
    }
    get description(): StringModel_1 {
        return this[_getPropertyModel_1]("description", (parent, key) => new StringModel_1(parent, key, true, { validators: [new NotBlank_1()], meta: { javaType: "java.lang.String" } }));
    }
    get code(): StringModel_1 {
        return this[_getPropertyModel_1]("code", (parent, key) => new StringModel_1(parent, key, true, { validators: [new NotBlank_1(), new Size_1({ min: 2, max: 2 })], meta: { javaType: "java.lang.String" } }));
    }
}
export default FunctionalAreaModel;
