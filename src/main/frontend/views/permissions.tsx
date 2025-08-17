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
import { ScreenHelp } from '../components/screen-help';

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
    <main className="space-y-6">
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
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Screen Permissions</h1>
            <ScreenHelp 
              title="Screen Permissions"
              content={
                <div>
                  <h3>Role-Based Access Control (RBAC)</h3>
                  <p>Control what users can see and do in the application based on their roles.</p>
                  
                  <h4>How It Works</h4>
                  <ol>
                    <li><strong>Select a Role:</strong> Choose from Administrator or User</li>
                    <li><strong>Set Permissions:</strong> Check boxes for Read/Write access</li>
                    <li><strong>Save Changes:</strong> Permissions update automatically</li>
                  </ol>
                  
                  <h4>Permission Types</h4>
                  <ul>
                    <li><strong>Read:</strong> User can view the screen and its data</li>
                    <li><strong>Write:</strong> User can create, edit, and delete items</li>
                    <li><strong>No Access:</strong> Screen is hidden from user</li>
                  </ul>
                  
                  <h4>Important Rules</h4>
                  <ul>
                    <li>Write permission requires Read permission</li>
                    <li>Changes apply immediately to user sessions</li>
                    <li>Admin role typically has full access</li>
                  </ul>
                  
                  <h4>Default Roles</h4>
                  <ul>
                    <li><strong>Administrator:</strong> Full access to all screens</li>
                    <li><strong>User:</strong> Limited access based on permissions</li>
                  </ul>
                </div>
              }
            />
          </div>
          <p className="text-muted-foreground">Manage role-based screen access permissions</p>
        </div>
        <Button 
          onClick={initializeAdminPermissions} 
          className="w-full sm:w-auto"
          aria-label="Initialize all permissions for administrator role"
        >
          Initialize Admin Permissions
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible">
              {roles.map((role, index) => (
                <Button
                  key={`role-${role.id || index}`}
                  variant={selectedRole?.id === role.id ? "default" : "outline"}
                  className="flex-shrink-0 lg:w-full justify-start"
                  onClick={() => setSelectedRole(role)}
                  aria-pressed={selectedRole?.id === role.id}
                  aria-label={`Select ${role.name || 'Unknown Role'} role`}
                >
                  {role.name || 'Unknown Role'}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Screen Permissions {selectedRole && `- ${selectedRole.name}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedRole ? (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[120px]">Screen</TableHead>
                      <TableHead className="text-center min-w-[60px]">Read</TableHead>
                      <TableHead className="text-center min-w-[60px]">Write</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {SCREENS.map((screen) => {
                      const permission = getPermission(screen.name);
                      return (
                        <TableRow key={`screen-${screen.name}`}>
                          <TableCell className="font-medium text-sm">{screen.name}</TableCell>
                          <TableCell className="text-center">
                            <input
                              type="checkbox"
                              id={`read-${screen.name.replace(/\s+/g, '-').toLowerCase()}`}
                              checked={permission.canRead}
                              onChange={(e) => updatePermission(screen.name, e.target.checked, permission.canWrite)}
                              className="h-4 w-4"
                              aria-label={`Read permission for ${screen.name}`}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <input
                              type="checkbox"
                              id={`write-${screen.name.replace(/\s+/g, '-').toLowerCase()}`}
                              checked={permission.canWrite}
                              disabled={!permission.canRead}
                              onChange={(e) => updatePermission(screen.name, permission.canRead, e.target.checked)}
                              className="h-4 w-4 disabled:opacity-50 disabled:cursor-not-allowed"
                              aria-label={`Write permission for ${screen.name}`}
                              aria-describedby={!permission.canRead ? `write-disabled-${screen.name.replace(/\s+/g, '-').toLowerCase()}` : undefined}
                            />
                            {!permission.canRead && (
                              <span id={`write-disabled-${screen.name.replace(/\s+/g, '-').toLowerCase()}`} className="sr-only">
                                Write permission requires read permission to be enabled first
                              </span>
                            )}
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