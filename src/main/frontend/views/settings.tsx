import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

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
      <h1>Settings</h1>
      <p>Configure application settings</p>
    </main>
  );
}