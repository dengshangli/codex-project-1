'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Todo } from '@/lib/todo-store';
import { FilterType } from '@/lib/todo-store';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, CheckCircle2, Circle, Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('todos');
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  const saveTodos = useCallback((next: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(next));
    setTodos(next);
  }, []);

  const handleAdd = (todo: Todo) => {
    saveTodos([todo, ...todos]);
  };

  const handleToggle = (id: string) => {
    const next = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t,
    );
    saveTodos(next);
  };

  const handleDelete = (id: string) => {
    saveTodos(todos.filter((t) => t.id !== id));
  };

  const handleClearCompleted = () => {
    saveTodos(todos.filter((t) => !t.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  // Loading skeleton
  if (!mounted) {
    return (
      <div className="w-full space-y-5">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-9 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5">
      <TodoInput onAdd={handleAdd} />

      {/* Stats bar */}
      {stats.total > 0 && (
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="h-5 rounded-full px-2 text-xs">
              {stats.active} 待办
            </Badge>
            <Badge variant="outline" className="h-5 rounded-full px-2 text-xs">
              {stats.completed} 已完成
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Sparkles className="size-3" />
            <span>完成率 {completionRate}%</span>
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterType)}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="all" className="gap-1.5">
            <Circle className="size-3.5" />
            全部
          </TabsTrigger>
          <TabsTrigger value="active" className="gap-1.5">
            <CheckCircle2 className="size-3.5" />
            进行中
          </TabsTrigger>
          <TabsTrigger value="completed" className="gap-1.5">
            <CheckCircle2 className="size-3.5" />
            已完成
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Todo list */}
      <div className="space-y-1.5 min-h-[120px]">
        {filteredTodos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            {stats.total === 0 ? (
              <>
                <CheckCircle2 className="size-10 mb-3 opacity-20" />
                <p className="text-sm font-medium">暂无待办事项</p>
                <p className="text-xs mt-1">添加一个开始吧</p>
              </>
            ) : (
              <>
                <Circle className="size-10 mb-3 opacity-20" />
                <p className="text-sm font-medium">没有匹配的待办事项</p>
                <p className="text-xs mt-1">试试切换筛选条件</p>
              </>
            )}
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Footer */}
      {stats.completed > 0 && (
        <>
          <Separator className="my-2" />
          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-muted-foreground">
              已完成 {stats.completed}/{stats.total} 项
            </span>
            <Button
              variant="ghost"
              size="xs"
              className="text-muted-foreground hover:text-destructive gap-1"
              onClick={handleClearCompleted}
            >
              <Trash2 className="size-3.5" />
              清除已完成
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
