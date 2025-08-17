import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { PermissionService, RoleService } from 'Frontend/generated/endpoints';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../components/ui/breadcrumb';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { useEffect, useState } from 'react';

export const config: ViewConfig = {
  menu: {
    title: 'Permissions',
    icon: 'vaadin:shield',
  },
  loginRequired: true,
};

const SCREENS = [
  { name: 'Task List', path: '/task-list' },
  { name: 'Functional Areas', path: '/functional-area' },
  { name: 'Users', path: '/users' },
  { name: 'Roles', path: '/roles' },
  { name: 'Permissions', path: '/permissions' },
  { name: 'Analytics', path: '/analytics' },
  { name: 'Reports', path: '/reports' },
  { name: 'Settings', path: '/settings' },
  { name: 'Reference', path: '/reference' }
];

export default function PermissionsView() {
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  const loadRoles = async () => {
    try {
      const result = await RoleService.getAllRoles();
      if (result) {
        setRoles(result);
        if (result.length > 0) {
          setSelectedRole(result[0]);
        }
      }
    } catch (error) {
      console.error('Failed to load roles:', error);
    }
  };

  const loadPermissions = async (role: any) => {
    if (!role) return;
    
    try {
      const result = await PermissionService.findByRoleId(role.id);
      if (result) {
        setPermissions(result);
      }
    } catch (error) {
      console.error('Failed to load permissions:', error);
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  useEffect(() => {
    if (selectedRole) {
      loadPermissions(selectedRole);
    }
  }, [selectedRole]);

  const getPermission = (screenName: string) => {
    return permissions.find(p => p.screenName === screenName) || 
           { screenName, canRead: false, canWrite: false };
  };

  const updatePermission = async (screenName: string, canRead: boolean, canWrite: boolean) => {
    if (!selectedRole || !selectedRole.id) {
      console.error('No role selected or role has no ID');
      return;
    }

    // Validation: Write permission requires Read permission
    if (canWrite && !canRead) {
      alert('Write permission requires Read permission to be enabled first.');
      return;
    }

    try {
      await PermissionService.savePermission(selectedRole.id, screenName, canRead, canWrite);
      loadPermissions(selectedRole);
    } catch (error) {
      console.error('Failed to save permission:', error);
      alert('Failed to save permission: ' + (error as any).message);
    }
  };

  const initializeAdminPermissions = async () => {
    const adminRole = roles.find(role => role.name === 'ADMINISTRATOR');
    if (!adminRole || !adminRole.id) {
      alert('Administrator role not found or has no ID');
      return;
    }

    try {
      for (const screen of SCREENS) {
        await PermissionService.savePermission(adminRole.id, screen.name, true, true);
      }
      loadPermissions(selectedRole);
      alert('Administrator permissions initialized successfully!');
    } catch (error) {
      console.error('Failed to initialize admin permissions:', error);
      alert('Failed to initialize admin permissions');
    }
  };

  return (
    <main className="p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Permissions</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Screen Permissions</h1>
          <p className="text-muted-foreground">Manage role-based screen access permissions</p>
        </div>
        <Button onClick={initializeAdminPermissions}>
          Initialize Admin Permissions
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {roles.map((role, index) => (
                <Button
                  key={`role-${role.id || index}`}
                  variant={selectedRole?.id === role.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedRole(role)}
                >
                  {role.name || 'Unknown Role'}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>
              Screen Permissions {selectedRole && `- ${selectedRole.name}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedRole ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Screen</TableHead>
                      <TableHead className="text-center">Read</TableHead>
                      <TableHead className="text-center">Write</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {SCREENS.map((screen) => {
                      const permission = getPermission(screen.name);
                      return (
                        <TableRow key={`screen-${screen.name}`}>
                          <TableCell className="font-medium">{screen.name}</TableCell>
                          <TableCell className="text-center">
                            <input
                              type="checkbox"
                              checked={permission.canRead}
                              onChange={(e) => updatePermission(screen.name, e.target.checked, permission.canWrite)}
                              className="h-4 w-4"
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <input
                              type="checkbox"
                              checked={permission.canWrite}
                              disabled={!permission.canRead}
                              onChange={(e) => updatePermission(screen.name, permission.canRead, e.target.checked)}
                              className="h-4 w-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground">Select a role to manage permissions</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}