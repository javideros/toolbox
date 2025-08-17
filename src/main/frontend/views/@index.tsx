import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage
} from '../components/ui/breadcrumb';
import { ChevronRight } from 'lucide-react';
import { DashboardConfigService } from 'Frontend/generated/endpoints';
import { useEffect, useState } from 'react';
import { ScreenHelp } from '../components/screen-help';

export const config: ViewConfig = {
  menu: {
    title: 'Dashboard',
    icon: 'vaadin:dashboard',
  },
  loginRequired: true,
};

const fallbackTiles = [
  { id: 1, title: 'Task List', description: 'Manage and track your tasks', link: '/task-list' },
  { id: 2, title: 'Reference', description: 'System reference data management', link: '/reference' },
  { id: 4, title: 'Settings', description: 'Application settings and configuration', link: '/settings' },
  { id: 5, title: 'Users', description: 'User management and administration', link: '/users' },
  { id: 6, title: 'Analytics', description: 'View system analytics and reports', link: '/analytics' },
  { id: 7, title: 'Reports', description: 'Generate and view system reports', link: '/reports' }
];

export default function MainView() {
  const [tiles, setTiles] = useState<any[]>(fallbackTiles);

  useEffect(() => {
    const loadTiles = async () => {
      try {
        const result = await DashboardConfigService.getTilesForDashboard();
        if (result && result.length > 0) {
          setTiles(result);
        }
      } catch (error) {
        console.error('Failed to load dashboard tiles:', error);
        // Keep fallback tiles if service fails
      }
    };
    loadTiles();
  }, []);

  return (
    <main className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your application dashboard</p>
        </div>
        <ScreenHelp 
          title="Dashboard"
          content={
            <div>
              <h3>Welcome to the Dashboard</h3>
              <p>This is your main hub for accessing all application features. Here's what you can do:</p>
              
              <h4>Navigation Tiles</h4>
              <ul>
                <li><strong>Click any tile</strong> to navigate to that section</li>
                <li><strong>Tiles are filtered</strong> based on your permissions</li>
                <li><strong>Hover effects</strong> provide visual feedback</li>
              </ul>
              
              <h4>Quick Tips</h4>
              <ul>
                <li>Use <kbd>Alt + H</kbd> to return to dashboard anytime</li>
                <li>The sidebar shows the same navigation options</li>
                <li>Your available features depend on your user role</li>
              </ul>
              
              <h4>Getting Started</h4>
              <p>New users typically start with:</p>
              <ol>
                <li><strong>Task List</strong> - Create and manage tasks</li>
                <li><strong>Settings</strong> - Configure your preferences</li>
                <li><strong>Users</strong> - Manage team members (if you're an admin)</li>
              </ol>
            </div>
          }
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tiles.map((tile) => (
          <Card key={tile.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <a href={tile.link} className="block no-underline text-inherit">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg">{tile.title}</CardTitle>
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
                </div>
                <CardDescription className="text-sm">{tile.description}</CardDescription>
              </CardHeader>
            </a>
          </Card>
        ))}
      </div>
    </main>
  );
}
