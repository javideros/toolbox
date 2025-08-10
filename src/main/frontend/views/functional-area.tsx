import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { FunctionalAreaService } from 'Frontend/generated/endpoints';
import { Grid, GridColumn, Button, Dialog, TextField, FormLayout } from '@vaadin/react-components';
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
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Functional Areas</h1>
          <p className="text-muted-foreground">Manage system functional areas</p>
        </div>
        <Button theme="primary" onClick={handleAdd}>Add New</Button>
      </div>
      
      <Grid items={items}>
        <GridColumn path="name" header="Name" />
        <GridColumn path="description" header="Description" />
        <GridColumn path="code" header="Code" />
        <GridColumn header="Actions">
          {({ item }) => (
            <div className="flex gap-2">
              <Button theme="tertiary" onClick={() => handleEdit(item)}>Edit</Button>
              <Button theme="error tertiary" onClick={() => handleDelete(item)}>Delete</Button>
            </div>
          )}
        </GridColumn>
      </Grid>

      <Dialog opened={dialogOpen} onOpenedChanged={(e) => setDialogOpen(e.detail.value)}>
        <div className="p-4" style={{ minWidth: '400px' }}>
          <h2 className="text-xl font-bold mb-4">{editItem ? 'Edit' : 'Add'} Functional Area</h2>
          
          <FormLayout>
            <TextField
              label="Name"
              value={formData.name}
              onValueChanged={(e) => setFormData({ ...formData, name: e.detail.value })}
              required
            />
            <TextField
              label="Description"
              value={formData.description}
              onValueChanged={(e) => setFormData({ ...formData, description: e.detail.value })}
              required
            />
            <TextField
              label="Code (2 letters)"
              value={formData.code}
              onValueChanged={(e) => {
                const value = e.detail.value.toUpperCase().slice(0, 2);
                setFormData({ ...formData, code: value });
              }}
              required
            />
          </FormLayout>
          
          <div className="flex gap-2 justify-end mt-4">
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button theme="primary" onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Dialog>
    </main>
  );
}