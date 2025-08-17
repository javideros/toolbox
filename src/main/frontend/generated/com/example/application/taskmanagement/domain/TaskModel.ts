import { _getPropertyModel as _getPropertyModel_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, NumberModel as NumberModel_1, Size as Size_1, StringModel as StringModel_1 } from "@vaadin/hilla-lit-form";
import AbstractEntityModel_1 from "../../base/domain/AbstractEntityModel.js";
import type Task_1 from "./Task.js";
class TaskModel<T extends Task_1 = Task_1> extends AbstractEntityModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(TaskModel);
    get id(): NumberModel_1 {
        return this[_getPropertyModel_1]("id", (parent, key) => new NumberModel_1(parent, key, true, { meta: { annotations: [{ name: "jakarta.persistence.Id" }], javaType: "java.lang.Long" } }));
    }
    get description(): StringModel_1 {
        return this[_getPropertyModel_1]("description", (parent, key) => new StringModel_1(parent, key, false, { validators: [new Size_1({ max: 255 })], meta: { javaType: "java.lang.String" } }));
    }
    get creationDate(): StringModel_1 {
        return this[_getPropertyModel_1]("creationDate", (parent, key) => new StringModel_1(parent, key, false, { meta: { javaType: "java.time.Instant" } }));
    }
    get dueDate(): StringModel_1 {
        return this[_getPropertyModel_1]("dueDate", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.time.LocalDate" } }));
    }
}
export default TaskModel;
