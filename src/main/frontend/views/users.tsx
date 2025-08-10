import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = {
  menu: {
    title: 'Users',
    icon: 'vaadin:users',
  },
  loginRequired: true,
};

export default function UsersView() {
  return (
    <main className="p-m">
      <h1>Users</h1>
      <p>Manage user accounts and permissions</p>
    </main>
  );
}