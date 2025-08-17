interface DashboardTile {
    id?: number;
    title?: string;
    description?: string;
    link?: string;
    icon?: string;
    enabled: boolean;
    showInMenu: boolean;
    showInDashboard: boolean;
    adminOnly: boolean;
    order: number;
}
export default DashboardTile;
