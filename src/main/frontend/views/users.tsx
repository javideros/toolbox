import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { UserService, RoleService } from 'Frontend/generated/endpoints';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../components/ui/breadcrumb';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { useEffect, useState } from 'react';

export const config: ViewConfig = {
  menu: {
    title: 'Users',
    icon: 'vaadin:users',
  },
  loginRequired: true,
};

export default function UsersView() {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);
  const [formData, setFormData] = useState({ 
    username: '', 
    fullName: '', 
    email: '', 
    roleIds: [] as number[] 
  });

  const loadUsers = async () => {
    try {
      const result = await UserService.list({ pageNumber: 0, pageSize: 1000, sort: { orders: [] } }, undefined);
      if (result) {
        setUsers(result.filter(item => item !== undefined));
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const loadRoles = async () => {
    try {
      const result = await RoleService.list({ pageNumber: 0, pageSize: 1000, sort: { orders: [] } }, undefined);
      if (result) {
        setRoles(result.filter(item => item !== undefined));
      }
    } catch (error) {
      console.error('Failed to load roles:', error);
    }
  };

  useEffect(() => {
    loadUsers();
    loadRoles();
  }, []);

  const handleAdd = () => {
    setEditUser(null);
    setFormData({ username: '', fullName: '', email: '', roleIds: [] });
    setDialogOpen(true);
  };

  const handleEdit = (user: any) => {
    setEditUser(user);
    setFormData({ 
      username: user.username || '', 
      fullName: user.fullName || '',
      email: user.email || '',
      roleIds: user.roles?.map((r: any) => r.id) || []
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      const selectedRoles = roles.filter(role => formData.roleIds.includes(role.id));
      const user = {
        id: editUser?.id,
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        roles: selectedRoles,
        active: true
      };
      await UserService.save(user);
      setDialogOpen(false);
      loadUsers();
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save: ' + (error as any).message);
    }
  };

  const handleDelete = async (user: any) => {
    if (user.id && confirm('Are you sure you want to delete this user?')) {
      try {
        await UserService.delete(user.id);
        loadUsers();
      } catch (error) {
        console.error('Failed to delete:', error);
        alert('Failed to delete: ' + (error as any).message);
      }
    }
  };

  const getRoleNames = (userRoles: any[]) => {
    return userRoles?.map(role => role.name).join(', ') || 'No roles';
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
            <BreadcrumbPage>Users</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and role assignments</p>
        </div>
        <Button onClick={handleAdd}>Add User</Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getRoleNames(user.roles)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(user)}>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editUser ? 'Edit' : 'Add'} User</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Roles</Label>
              <div className="col-span-3 space-y-2">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`role-${role.id}`}
                      checked={formData.roleIds.includes(role.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, roleIds: [...formData.roleIds, role.id] });
                        } else {
                          setFormData({ ...formData, roleIds: formData.roleIds.filter(id => id !== role.id) });
                        }
                      }}
                    />
                    <Label htmlFor={`role-${role.id}`} className="text-sm">{role.name}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}