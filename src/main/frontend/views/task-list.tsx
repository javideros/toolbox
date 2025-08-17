import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Grid, GridColumn, TextField } from '@vaadin/react-components';
import { Button } from '../components/ui/button';
import { DatePicker } from '../components/ui/date-picker';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../components/ui/breadcrumb';
import { TaskService } from 'Frontend/generated/endpoints';
import { useSignal } from '@vaadin/hilla-react-signals';
import handleError from 'Frontend/views/_ErrorHandler';
import { useGridDataProvider } from '@vaadin/hilla-react-crud';
import { ScreenHelp } from '../components/screen-help';
import { toast } from 'sonner';

export const config: ViewConfig = {
  title: 'Task List',
  menu: {
    icon: 'vaadin:clipboard-check',
    order: 1,
    title: 'Task List',
  },
  loginRequired: true,
};

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'medium',
});

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
});

type TaskEntryFormProps = {
  onTaskCreated?: () => void;
};

function TaskEntryForm(props: TaskEntryFormProps) {
  const description = useSignal('');
  const dueDate = useSignal<string | undefined>('');
  const createTask = async () => {
    try {
      await TaskService.createTask(description.value, dueDate.value);
      if (props.onTaskCreated) {
        props.onTaskCreated();
      }
      description.value = '';
      dueDate.value = undefined;
      toast.success('Task added');
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <>
      <TextField
        placeholder="What do you want to do?"
        aria-label="Task description"
        maxlength={255}
        className="flex-1 min-w-0"
        value={description.value}
        onValueChanged={(evt) => (description.value = evt.detail.value)}
      />
      <DatePicker
        placeholder="Due date"
        value={dueDate.value ? new Date(dueDate.value) : undefined}
        onChange={(date) => (dueDate.value = date ? date.toISOString().split('T')[0] : undefined)}
        className="w-full sm:w-[200px]"
        aria-label="Task due date"
      />
      <Button 
        onClick={createTask} 
        className="w-full sm:w-auto"
        aria-label="Create new task"
        disabled={!description.value.trim()}
      >
        Create
      </Button>
    </>
  );
}

export default function TaskListView() {
  const dataProvider = useGridDataProvider(TaskService.list);

  return (
    <main className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Task List</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Task List</h1>
        <ScreenHelp 
          title="Task List"
          content={
            <div>
              <h3>Managing Your Tasks</h3>
              <p>This screen helps you create, view, and organize your tasks efficiently.</p>
              
              <h4>Creating Tasks</h4>
              <ul>
                <li><strong>Description:</strong> Enter what you need to do</li>
                <li><strong>Due Date:</strong> Optional deadline for the task</li>
                <li><strong>Create Button:</strong> Click to add the task to your list</li>
              </ul>
              
              <h4>Task Information</h4>
              <ul>
                <li><strong>Description:</strong> The task details</li>
                <li><strong>Due Date:</strong> When the task should be completed</li>
                <li><strong>Created:</strong> When you added the task</li>
              </ul>
              
              <h4>Keyboard Shortcuts</h4>
              <ul>
                <li><kbd>Alt + T</kbd> - Navigate to Task List</li>
                <li><kbd>Ctrl + N</kbd> - Focus on new task form</li>
                <li><kbd>Tab</kbd> - Navigate between form fields</li>
              </ul>
              
              <h4>Tips</h4>
              <ul>
                <li>Tasks without due dates show "Never"</li>
                <li>Use clear, actionable descriptions</li>
                <li>Set realistic due dates to stay organized</li>
              </ul>
            </div>
          }
        />
      </div>
      <section className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border" aria-label="Create new task">
        <TaskEntryForm onTaskCreated={dataProvider.refresh} />
      </section>
      <div className="overflow-x-auto" role="region" aria-label="Tasks table">
        <Grid dataProvider={dataProvider} className="min-w-full" aria-label="List of tasks">
          <GridColumn path="description" header="Description" className="min-w-[200px]" />
          <GridColumn path="dueDate" header="Due Date" className="min-w-[120px]">
            {({ item }) => (
              <span aria-label={item.dueDate ? `Due ${dateFormatter.format(new Date(item.dueDate))}` : 'No due date'}>
                {item.dueDate ? dateFormatter.format(new Date(item.dueDate)) : 'Never'}
              </span>
            )}
          </GridColumn>
          <GridColumn path="creationDate" header="Created" className="min-w-[140px]">
            {({ item }) => (
              <span aria-label={`Created ${dateTimeFormatter.format(new Date(item.creationDate))}`}>
                {dateTimeFormatter.format(new Date(item.creationDate))}
              </span>
            )}
          </GridColumn>
        </Grid>
      </div>
    </main>
  );
}
