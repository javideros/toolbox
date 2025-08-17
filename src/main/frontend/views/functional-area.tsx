import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { FunctionalAreaService } from 'Frontend/generated/endpoints';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../components/ui/breadcrumb';
import { Grid, GridColumn } from '@vaadin/react-components';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { useEffect, useState } from 'react';

export const config: ViewConfig = {
  menu: {
    title: 'Functional Areas',
    icon: 'vaadin:cogs',
  },
  loginRequired: true,
};

export default function FunctionalAreaView() {
  const [items, setItems] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', description: '', code: '' });

  const loadItems = async () => {
    try {
      const result = await FunctionalAreaService.list({ pageNumber: 0, pageSize: 1000, sort: { orders: [] } }, undefined);
      if (result) {
        setItems(result.filter(item => item !== undefined));
      }
    } catch (error) {
      console.error('Failed to load items:', error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleAdd = () => {
    setEditItem(null);
    setFormData({ name: '', description: '', code: '' });
    setDialogOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditItem(item);
    setFormData({ 
      name: item.name || '', 
      description: item.description || '', 
      code: item.code || '' 
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      const item = {
        id: editItem?.id,
        name: formData.name,
        description: formData.description,
        code: formData.code.toUpperCase()
      };
      await FunctionalAreaService.save(item);
      setDialogOpen(false);
      loadItems();
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save: ' + (error as any).message);
    }
  };

  const handleDelete = async (item: any) => {
    if (item.id && confirm('Are you sure you want to delete this item?')) {
      try {
        await FunctionalAreaService.delete(item.id);
        loadItems();
      } catch (error) {
        console.error('Failed to delete:', error);
        alert('Failed to delete: ' + (error as any).message);
      }
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
            <BreadcrumbPage>Functional Areas</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Functional Areas</h1>
          <p className="text-muted-foreground">Manage system functional areas</p>
        </div>
        <Button onClick={handleAdd}>Add New</Button>
      </div>
      
      <Grid items={items}>
        <GridColumn path="name" header="Name" />
        <GridColumn path="description" header="Description" />
        <GridColumn path="code" header="Code" />
        <GridColumn header="Actions">
          {({ item }) => (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleEdit(item)}>Edit</Button>
              <Button variant="destructive" onClick={() => handleDelete(item)}>Delete</Button>
            </div>
          )}
        </GridColumn>
      </Grid>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editItem ? 'Edit' : 'Add'} Functional Area</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">Code</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase().slice(0, 2);
                  setFormData({ ...formData, code: value });
                }}
                className="col-span-3"
                placeholder="2 letters"
                maxLength={2}
                required
              />
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