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
    title: 'Analytics',
    icon: 'vaadin:chart',
  },
  loginRequired: true,
};

export default function AnalyticsView() {
  return (
    <main className="p-m">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Analytics</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1>Analytics</h1>
      <p>View performance metrics and insights</p>
    </main>
  );
}