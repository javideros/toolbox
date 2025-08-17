/**
 * Example: Hybrid Form with Vaadin + shadcn/ui Components
 * 
 * This example demonstrates how to create forms that seamlessly
 * integrate Vaadin form components with shadcn/ui components
 * while maintaining consistent styling and validation.
 */

import { TextField } from '@vaadin/react-components';
import { Button } from '../../src/main/frontend/components/ui/button';
import { DatePicker } from '../../src/main/frontend/components/ui/date-picker';
import { toast } from 'sonner';
import { useSignal } from '@vaadin/hilla-react-signals';

interface FormData {
  name: string;
  email: string;
  dueDate: Date | undefined;
}

export function HybridFormExample() {
  const formData = useSignal<FormData>({
    name: '',
    email: '',
    dueDate: undefined
  });

  const handleSubmit = async () => {
    // Validation example
    if (!formData.value.name.trim()) {
      toast.error('Name is required');
      return;
    }

    try {
      // Submit logic here
      toast.success('Form submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit form');
    }
  };

  return (
    <div className="space-y-4 p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Hybrid Form Example</h2>
      
      {/* Vaadin TextField - Server-side validation support */}
      <TextField
        label="Full Name"
        placeholder="Enter your name"
        value={formData.value.name}
        onValueChanged={(e) => 
          formData.value = { ...formData.value, name: e.detail.value }
        }
        className="w-full"
        required
      />

      {/* Vaadin TextField for email with built-in validation */}
      <TextField
        label="Email"
        placeholder="Enter your email"
        type="email"
        value={formData.value.email}
        onValueChanged={(e) => 
          formData.value = { ...formData.value, email: e.detail.value }
        }
        className="w-full"
        required
      />

      {/* shadcn/ui DatePicker - Consistent styling */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Due Date</label>
        <DatePicker
          value={formData.value.dueDate}
          onChange={(date) => 
            formData.value = { ...formData.value, dueDate: date }
          }
          className="w-full"
        />
      </div>

      {/* shadcn/ui Button - Consistent with design system */}
      <Button 
        onClick={handleSubmit}
        className="w-full"
        disabled={!formData.value.name.trim()}
      >
        Submit Form
      </Button>
    </div>
  );
}

/**
 * Key Integration Points:
 * 
 * 1. **Styling Consistency**: Both Vaadin and shadcn/ui components
 *    use Tailwind classes for consistent spacing and sizing
 * 
 * 2. **State Management**: useSignal provides reactive state
 *    that works with both component systems
 * 
 * 3. **Validation**: Vaadin components provide built-in validation
 *    while shadcn/ui components use custom validation logic
 * 
 * 4. **Notifications**: Sonner toasts provide consistent feedback
 *    across the entire application
 * 
 * 5. **Theme Integration**: All components respect the global
 *    dark/light theme switching
 */