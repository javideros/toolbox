import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { ReferenceService } from 'Frontend/generated/endpoints';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../components/ui/breadcrumb';
import { Grid, GridColumn } from '@vaadin/react-components';
import { useEffect, useState } from 'react';
import type ReferenceTable from 'Frontend/generated/com/example/application/reference/domain/ReferenceTable';

export const config: ViewConfig = {
  menu: {
    title: 'Reference',
    icon: 'vaadin:table',
  },
  loginRequired: true,
};

export default function ReferenceView() {
  const [items, setItems] = useState<ReferenceTable[]>([]);

  useEffect(() => {
    ReferenceService.list().then(data => {
      if (data) {
        setItems(data.filter((item): item is ReferenceTable => item !== undefined));
      }
    });
  }, []);

  return (
    <main className="p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Reference</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold mb-4">Reference Table</h1>
      <p className="text-muted-foreground mb-6">Manage reference data</p>
      
      <Grid items={items}>
        <GridColumn path="code" header="Code" />
        <GridColumn path="description" header="Description" />
        <GridColumn path="category" header="Category" />
      </Grid>
    </main>
  );
}