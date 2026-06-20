'use client';

import { useState } from 'react';
import { addTodo } from '@/lib/todo-store';
import type { Todo } from '@/lib/todo-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAdd: (todo: Todo) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const todo = addTodo(text);
    onAdd(todo);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="grid flex-1 gap-1.5">
        <Label htmlFor="todo" className="sr-only">
          添加待办事项
        </Label>
        <Input
          id="todo"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="添加待办事项..."
          className="h-9"
        />
      </div>
      <Button type="submit" size="sm" className="gap-1.5">
        <Plus className="size-3.5" />
        添加
      </Button>
    </form>
  );
}
