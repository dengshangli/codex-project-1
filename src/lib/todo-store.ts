export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export type FilterType = 'all' | 'active' | 'completed';

let todos: Todo[] = [];

export function getTodos(): Todo[] {
  return [...todos];
}

export function addTodo(text: string): Todo {
  const todo: Todo = {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
    createdAt: Date.now(),
  };
  todos.unshift(todo);
  return { ...todo };
}

export function toggleTodo(id: string): void {
  todos = todos.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
}

export function deleteTodo(id: string): void {
  todos = todos.filter(t => t.id !== id);
}

export function clearCompleted(): void {
  todos = todos.filter(t => !t.completed);
}

export function getFilteredTodos(filter: FilterType): Todo[] {
  switch (filter) {
    case 'active':
      return todos.filter(t => !t.completed);
    case 'completed':
      return todos.filter(t => t.completed);
    default:
      return todos;
  }
}

export function getStats() {
  const total = todos.length;
  const active = todos.filter(t => !t.completed).length;
  const completed = todos.filter(t => t.completed).length;
  return { total, active, completed };
}
