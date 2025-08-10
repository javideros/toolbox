import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

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
      <h1>Analytics</h1>
      <p>View performance metrics and insights</p>
    </main>
  );
}