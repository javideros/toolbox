import { _getPropertyModel as _getPropertyModel_1, ArrayModel as ArrayModel_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, ObjectModel as ObjectModel_1, StringModel as StringModel_1 } from "@vaadin/hilla-lit-form";
import type UserInfo_1 from "./UserInfo.js";
class UserInfoModel<T extends UserInfo_1 = UserInfo_1> extends ObjectModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(UserInfoModel);
    get userId(): StringModel_1 {
        return this[_getPropertyModel_1]("userId", (parent, key) => new StringModel_1(parent, key, false, { meta: { javaType: "java.lang.String" } }));
    }
    get preferredUsername(): StringModel_1 {
        return this[_getPropertyModel_1]("preferredUsername", (parent, key) => new StringModel_1(parent, key, false, { meta: { javaType: "java.lang.String" } }));
    }
    get fullName(): StringModel_1 {
        return this[_getPropertyModel_1]("fullName", (parent, key) => new StringModel_1(parent, key, false, { meta: { javaType: "java.lang.String" } }));
    }
    get profileUrl(): StringModel_1 {
        return this[_getPropertyModel_1]("profileUrl", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get pictureUrl(): StringModel_1 {
        return this[_getPropertyModel_1]("pictureUrl", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get email(): StringModel_1 {
        return this[_getPropertyModel_1]("email", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get zoneId(): StringModel_1 {
        return this[_getPropertyModel_1]("zoneId", (parent, key) => new StringModel_1(parent, key, false, { meta: { javaType: "java.lang.String" } }));
    }
    get locale(): StringModel_1 {
        return this[_getPropertyModel_1]("locale", (parent, key) => new StringModel_1(parent, key, false, { meta: { javaType: "java.lang.String" } }));
    }
    get authorities(): ArrayModel_1<StringModel_1> {
        return this[_getPropertyModel_1]("authorities", (parent, key) => new ArrayModel_1(parent, key, false, (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }), { meta: { javaType: "java.util.Collection" } }));
    }
}
export default UserInfoModel;
