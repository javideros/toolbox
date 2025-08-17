import { _getPropertyModel as _getPropertyModel_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, ObjectModel as ObjectModel_1 } from "@vaadin/hilla-lit-form";
import type AbstractEntity_1 from "./AbstractEntity.js";
class AbstractEntityModel<T extends AbstractEntity_1 = AbstractEntity_1> extends ObjectModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(AbstractEntityModel);
}
export default AbstractEntityModel;
