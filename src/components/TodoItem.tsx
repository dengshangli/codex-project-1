'use client';

import type { Todo } from '@/lib/todo-store';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="group/item flex items-center gap-3 px-3 py-2.5 rounded-lg border border-transparent hover:border-border hover:bg-muted/40 transition-colors">
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`flex-1 text-sm leading-none cursor-pointer ${
          todo.completed
            ? 'text-muted-foreground line-through'
            : 'text-foreground'
        }`}
      >
        {todo.text}
      </label>
      <Button
        variant="ghost"
        size="icon-sm"
        className="shrink-0 opacity-0 group-hover/item:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
        onClick={() => onDelete(todo.id)}
        aria-label="删除"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
