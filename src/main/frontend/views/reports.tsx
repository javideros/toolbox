import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../components/ui/breadcrumb';

export const config: ViewConfig = {
  menu: {
    title: 'Reports',
    icon: 'vaadin:file-text',
  },
  loginRequired: true,
};

export default function ReportsView() {
  return (
    <main className="p-m">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Reports</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1>Reports</h1>
      <p>Generate and download reports</p>
    </main>
  );
}