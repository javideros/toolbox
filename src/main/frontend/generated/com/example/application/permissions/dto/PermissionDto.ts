interface PermissionDto {
    id?: number;
    roleId?: number;
    roleName?: string;
    screenName?: string;
    canRead: boolean;
    canWrite: boolean;
}
export default PermissionDto;
