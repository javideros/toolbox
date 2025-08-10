import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

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
      <h1>Reports</h1>
      <p>Generate and download reports</p>
    </main>
  );
}