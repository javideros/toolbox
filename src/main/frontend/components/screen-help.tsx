import { useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface ScreenHelpProps {
  title: string;
  content: React.ReactNode;
  className?: string;
}

export function ScreenHelp({ title, content, className }: ScreenHelpProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Get help for ${title}`}
          className={cn("h-8 w-8 text-muted-foreground hover:text-foreground", className)}
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 sm:w-96">
        <SheetHeader>
          <SheetTitle>Help: {title}</SheetTitle>
          <SheetDescription>
            Learn how to use this screen effectively
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 overflow-y-auto">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            {content}
          </div>
        </div>
        <div className="mt-6 pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Press <kbd className="px-1 bg-muted rounded border text-xs">Esc</kbd> or click outside to close
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}