import { _getPropertyModel as _getPropertyModel_1, BooleanModel as BooleanModel_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, NumberModel as NumberModel_1, ObjectModel as ObjectModel_1, StringModel as StringModel_1 } from "@vaadin/hilla-lit-form";
import type DashboardTile_1 from "./DashboardTile.js";
class DashboardTileModel<T extends DashboardTile_1 = DashboardTile_1> extends ObjectModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(DashboardTileModel);
    get id(): NumberModel_1 {
        return this[_getPropertyModel_1]("id", (parent, key) => new NumberModel_1(parent, key, true, { meta: { javaType: "java.lang.Long" } }));
    }
    get title(): StringModel_1 {
        return this[_getPropertyModel_1]("title", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get description(): StringModel_1 {
        return this[_getPropertyModel_1]("description", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get link(): StringModel_1 {
        return this[_getPropertyModel_1]("link", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get icon(): StringModel_1 {
        return this[_getPropertyModel_1]("icon", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get enabled(): BooleanModel_1 {
        return this[_getPropertyModel_1]("enabled", (parent, key) => new BooleanModel_1(parent, key, false, { meta: { javaType: "boolean" } }));
    }
    get showInMenu(): BooleanModel_1 {
        return this[_getPropertyModel_1]("showInMenu", (parent, key) => new BooleanModel_1(parent, key, false, { meta: { javaType: "boolean" } }));
    }
    get showInDashboard(): BooleanModel_1 {
        return this[_getPropertyModel_1]("showInDashboard", (parent, key) => new BooleanModel_1(parent, key, false, { meta: { javaType: "boolean" } }));
    }
    get adminOnly(): BooleanModel_1 {
        return this[_getPropertyModel_1]("adminOnly", (parent, key) => new BooleanModel_1(parent, key, false, { meta: { javaType: "boolean" } }));
    }
    get order(): NumberModel_1 {
        return this[_getPropertyModel_1]("order", (parent, key) => new NumberModel_1(parent, key, false, { meta: { javaType: "int" } }));
    }
}
export default DashboardTileModel;
