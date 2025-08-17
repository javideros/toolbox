import { useEffect } from 'react';
import { useNavigate } from 'react-router';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  action: () => void;
  description: string;
}

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();

  const shortcuts: KeyboardShortcut[] = [
    // Navigation shortcuts
    { key: 'h', altKey: true, action: () => navigate('/'), description: 'Go to Dashboard' },
    { key: 't', altKey: true, action: () => navigate('/task-list'), description: 'Go to Task List' },
    { key: 'u', altKey: true, action: () => navigate('/users'), description: 'Go to Users' },
    { key: 'p', altKey: true, action: () => navigate('/permissions'), description: 'Go to Permissions' },
    { key: 'r', altKey: true, action: () => navigate('/reference'), description: 'Go to Reference' },
    { key: 's', altKey: true, action: () => navigate('/settings'), description: 'Go to Settings' },
    
    // Theme toggle
    { key: 'd', altKey: true, action: () => toggleTheme(), description: 'Toggle Dark/Light Mode' },
    
    // Focus management
    { key: '/', action: () => focusSearch(), description: 'Focus Search' },
    { key: 'Escape', action: () => clearFocus(), description: 'Clear Focus/Close Modals' },
    
    // Quick actions
    { key: 'n', ctrlKey: true, action: () => triggerNewAction(), description: 'New Item (Context Dependent)' },
    
    // Help
    { key: '?', action: () => showKeyboardHelp(), description: 'Show Keyboard Shortcuts' },
  ];

  const toggleTheme = () => {
    const themeToggle = document.querySelector('[data-theme-toggle]') as HTMLButtonElement;
    themeToggle?.click();
  };

  const focusSearch = () => {
    const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]') as HTMLInputElement;
    searchInput?.focus();
  };

  const clearFocus = () => {
    const activeElement = document.activeElement as HTMLElement;
    activeElement?.blur();
    
    // Close any open modals/dialogs
    const closeButtons = document.querySelectorAll('[data-dialog-close], [aria-label*="close" i]');
    (closeButtons[0] as HTMLElement)?.click();
  };

  const triggerNewAction = () => {
    // Context-dependent new action
    const addButtons = document.querySelectorAll('button');
    const newButton = Array.from(addButtons).find(btn => 
      btn.textContent?.toLowerCase().includes('add') ||
      btn.textContent?.toLowerCase().includes('create') ||
      btn.textContent?.toLowerCase().includes('new')
    );
    (newButton as HTMLElement)?.click();
  };

  const showKeyboardHelp = () => {
    const helpButton = document.querySelector('[aria-label="Show keyboard shortcuts"]') as HTMLButtonElement;
    helpButton?.click();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement ||
          (event.target as HTMLElement)?.contentEditable === 'true') {
        return;
      }

      const matchedShortcut = shortcuts.find(shortcut => 
        shortcut.key.toLowerCase() === event.key.toLowerCase() &&
        !!shortcut.ctrlKey === event.ctrlKey &&
        !!shortcut.altKey === event.altKey &&
        !!shortcut.shiftKey === event.shiftKey
      );

      if (matchedShortcut) {
        event.preventDefault();
        matchedShortcut.action();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return { shortcuts };
};