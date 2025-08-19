import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';

export default function handleError(error: any) {
  console.error('An unexpected error occurred', error);
  
  const errorMessage = error?.message || 'An unexpected error occurred';
  const isPermissionError = errorMessage.includes('permission') || errorMessage.includes('access');
  
  toast.error(isPermissionError ? 'Access Denied' : 'Something went wrong', {
    description: isPermissionError 
      ? 'You don\'t have permission to perform this action'
      : errorMessage,
    icon: <AlertCircle className="h-4 w-4" />,
    duration: 5000,
    action: {
      label: 'Dismiss',
      onClick: () => {},
    },
  });
}
