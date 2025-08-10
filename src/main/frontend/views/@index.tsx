import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ChevronRight } from 'lucide-react';
import { DashboardConfigService } from 'Frontend/generated/endpoints';
import { useEffect, useState } from 'react';

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
    <main className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your application dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => (
          <Card key={tile.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <a href={tile.link} className="block no-underline text-inherit">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{tile.title}</CardTitle>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>{tile.description}</CardDescription>
              </CardHeader>
            </a>
          </Card>
        ))}
      </div>
    </main>
  );
}
