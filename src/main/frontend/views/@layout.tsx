import { Outlet, useLocation, useNavigate } from 'react-router';
import '@vaadin/icons';
import {
  AppLayout,
  Avatar,
  Icon,
  MenuBar,
  MenuBarItem,
  MenuBarItemSelectedEvent,
  ProgressBar,
} from '@vaadin/react-components';
import { Suspense, useMemo, useEffect, useState } from 'react';
import { createMenuItems } from '@vaadin/hilla-file-router/runtime.js';
import { useAuth } from 'Frontend/security/auth';
import { AppConfigService, DashboardConfigService } from 'Frontend/generated/endpoints';
import { ThemeProvider } from '../components/theme-provider';
import { ModeToggle } from '../components/mode-toggle';
import { Button } from '../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../components/ui/sidebar';
import { cn } from '../lib/utils';
import { Menu, X } from 'lucide-react';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { KeyboardShortcutsHelp } from '../components/keyboard-shortcuts-help';
import { Toaster } from '../components/ui/sonner';
import '../styles/accessibility.css';

function Header({ onMenuToggle, isMobileMenuOpen }: { onMenuToggle: () => void; isMobileMenuOpen: boolean }) {
  const [appName, setAppName] = useState('Toolbox');

  useEffect(() => {
    AppConfigService.getAppName().then(name => {
      if (name) setAppName(name);
    });
  }, []);

  return (
    <div className="flex p-m gap-m items-center justify-between" slot="navbar">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="md:hidden h-8 w-8"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
        <span className="font-semibold text-l">{appName}</span>
      </div>
      <KeyboardShortcutsHelp />
    </div>
  );
}

function MainMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    DashboardConfigService.getTilesForMenu().then(tiles => {
      if (tiles) {
        const items = tiles
          .filter(tile => tile != null)
          .map(tile => ({
            to: tile.link,
            icon: tile.icon,
            title: tile.title
          }));
        setMenuItems(items);
      }
    }).catch(error => {
      console.error('Failed to load menu items:', error);
    });
  }, []);

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <div className="flex items-center justify-center p-2 mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="h-8 w-8 p-0"
          >
            <Icon icon="vaadin:cubes" className="text-primary h-6 w-6" />
          </Button>
        </div>
        <SidebarMenu>
          {menuItems.map(({ to, icon, title }) => {
            const isActive = location.pathname === to;
            return (
              <SidebarMenuItem key={to}>
                <div className="relative group">
                  <SidebarMenuButton
                    onClick={() => navigate(to)}
                    isActive={isActive}
                    className="h-8 w-8 p-0 justify-center"
                  >
                    {icon && <Icon icon={icon} className="h-4 w-4" />}
                  </SidebarMenuButton>
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md border opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] top-1/2 -translate-y-1/2">
                    {title}
                  </div>
                </div>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

type UserMenuItem = MenuBarItem<{ action?: () => void | Promise<void> }>;

function UserMenu() {
  const { logout, state } = useAuth();

  const fullName = state.user?.fullName;
  const pictureUrl = state.user?.pictureUrl;
  const profileUrl = state.user?.profileUrl;

  if (!state.user) {
    return null;
  }

  return (
    <SidebarFooter>
      <div className="flex flex-col gap-1">
        <ModeToggle data-theme-toggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="h-8 w-8 p-0 justify-center">
              <Avatar theme="xsmall" img={pictureUrl} name={fullName} colorIndex={5} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end">
            {profileUrl && (
              <DropdownMenuItem onClick={() => window.open(profileUrl, 'blank')?.focus()}>
                View Profile
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={logout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </SidebarFooter>
  );
}

export default function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useKeyboardShortcuts(); // Enable keyboard shortcuts

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="toolbox-theme">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <AppLayout primarySection="drawer" style={{ 
        '--vaadin-app-layout-drawer-width': '60px',
        '--vaadin-app-layout-drawer-overlay': 'var(--lumo-shade-20pct)' 
      } as React.CSSProperties}>
      <Header onMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
      
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <Sidebar 
        slot="drawer" 
        collapsible="icon" 
        className={cn(
          "group transition-transform duration-200 z-50",
          "md:relative md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <SidebarContent>
          <MainMenu />
        </SidebarContent>
        <UserMenu />
      </Sidebar>
      <Suspense fallback={<ProgressBar indeterminate={true} className="m-0" />}>
        <div id="main-content" className="px-4 py-6 sm:px-6">
          <Outlet />
        </div>
      </Suspense>
      </AppLayout>
      <Toaster />
    </ThemeProvider>
  );
}
