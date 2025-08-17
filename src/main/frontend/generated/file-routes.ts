import { createRoute as createRoute_1 } from "@vaadin/hilla-file-router/runtime.js";
import type { AgnosticRoute as AgnosticRoute_1, RouteModule as RouteModule_1 } from "@vaadin/hilla-file-router/types.js";
import { lazy as lazy_1 } from "react";
import * as Page_1 from "../views/@index.js";
import * as Layout_1 from "../views/@layout.js";
const routes: readonly AgnosticRoute_1[] = [
    createRoute_1("", Layout_1.default, (Layout_1 as RouteModule_1).config, [
        createRoute_1("", Page_1.default, (Page_1 as RouteModule_1).config),
        createRoute_1("analytics", lazy_1(() => import("../views/analytics.js")), { "route": "analytics", "menu": { "title": "Analytics", "icon": "vaadin:chart" }, "loginRequired": true, "flowLayout": false, "title": "Analytics" }),
        createRoute_1("functional-area", lazy_1(() => import("../views/functional-area.js")), { "route": "functional-area", "menu": { "title": "Functional Areas", "icon": "vaadin:cogs" }, "loginRequired": true, "flowLayout": false, "title": "Functional Area" }),
        createRoute_1("permissions", lazy_1(() => import("../views/permissions.js")), { "route": "permissions", "menu": { "title": "Permissions", "icon": "vaadin:shield" }, "loginRequired": true, "flowLayout": false, "title": "Permissions" }),
        createRoute_1("reference", lazy_1(() => import("../views/reference.js")), { "route": "reference", "menu": { "title": "Reference", "icon": "vaadin:table" }, "loginRequired": true, "flowLayout": false, "title": "Reference" }),
        createRoute_1("reports", lazy_1(() => import("../views/reports.js")), { "route": "reports", "menu": { "title": "Reports", "icon": "vaadin:file-text" }, "loginRequired": true, "flowLayout": false, "title": "Reports" }),
        createRoute_1("roles", lazy_1(() => import("../views/roles.js")), { "route": "roles", "menu": { "title": "Roles", "icon": "vaadin:key" }, "loginRequired": true, "flowLayout": false, "title": "Roles" }),
        createRoute_1("settings", lazy_1(() => import("../views/settings.js")), { "route": "settings", "menu": { "title": "Settings", "icon": "vaadin:cog" }, "loginRequired": true, "flowLayout": false, "title": "Settings" }),
        createRoute_1("task-list", lazy_1(() => import("../views/task-list.js")), { "route": "task-list", "title": "Task List", "menu": { "icon": "vaadin:clipboard-check", "order": 1, "title": "Task List" }, "loginRequired": true, "flowLayout": false }),
        createRoute_1("users", lazy_1(() => import("../views/users.js")), { "route": "users", "menu": { "title": "Users", "icon": "vaadin:users" }, "loginRequired": true, "flowLayout": false, "title": "Users" })
    ])
];
export default routes;
