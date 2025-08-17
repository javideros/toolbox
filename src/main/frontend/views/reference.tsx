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
    <main className="space-y-6">
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
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Reference Table</h1>
        <p className="text-muted-foreground">Manage reference data</p>
      </div>
      
      <div className="overflow-x-auto">
        <Grid items={items} className="min-w-full">
          <GridColumn path="code" header="Code" className="min-w-[100px]" />
          <GridColumn path="description" header="Description" className="min-w-[200px]" />
          <GridColumn path="category" header="Category" className="min-w-[120px]" />
        </Grid>
      </div>
    </main>
  );
}