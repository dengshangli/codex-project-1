export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export type FilterType = 'all' | 'active' | 'completed';

export function addTodo(text: string): Todo {
  const stored = localStorage.getItem('todos');
  const todos: Todo[] = stored ? JSON.parse(stored) : [];
  const todo: Todo = {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
    createdAt: Date.now(),
  };
  todos.unshift(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  return todo;
}

export function toggleTodo(id: string): void {
  const stored = localStorage.getItem('todos');
  if (!stored) return;
  const todos: Todo[] = JSON.parse(stored);
  const next = todos.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t,
  );
  localStorage.setItem('todos', JSON.stringify(next));
}

export function deleteTodo(id: string): void {
  const stored = localStorage.getItem('todos');
  if (!stored) return;
  const todos: Todo[] = JSON.parse(stored);
  const next = todos.filter((t) => t.id !== id);
  localStorage.setItem('todos', JSON.stringify(next));
}

export function clearCompleted(): void {
  const stored = localStorage.getItem('todos');
  if (!stored) return;
  const todos: Todo[] = JSON.parse(stored);
  const next = todos.filter((t) => !t.completed);
  localStorage.setItem('todos', JSON.stringify(next));
}
