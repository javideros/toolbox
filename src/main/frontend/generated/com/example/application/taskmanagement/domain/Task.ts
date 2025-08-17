import type AbstractEntity_1 from "../../base/domain/AbstractEntity.js";
interface Task extends AbstractEntity_1 {
    id?: number;
    description: string;
    creationDate: string;
    dueDate?: string;
}
export default Task;
