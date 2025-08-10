import { useEffect, useState } from 'react';
import { MenuConfigService } from 'Frontend/generated/endpoints';
import { SideNav, SideNavItem } from '@vaadin/react-components';

export function DynamicMenu() {
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const items = await MenuConfigService.getMenuItems();
        if (items) {
          setMenuItems(items);
        }
      } catch (error) {
        console.error('Failed to load menu items:', error);
      }
    };
    loadMenuItems();
  }, []);

  return (
    <SideNav>
      {menuItems.map((item) => (
        <SideNavItem key={item.id} path={item.link}>
          {item.title}
        </SideNavItem>
      ))}
    </SideNav>
  );
}