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
    title: 'Settings',
    icon: 'vaadin:cog',
  },
  loginRequired: true,
};

export default function SettingsView() {
  return (
    <main className="p-m">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1>Settings</h1>
      <p>Configure application settings</p>
    </main>
  );
}