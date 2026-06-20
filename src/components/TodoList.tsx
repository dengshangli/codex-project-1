'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getTodos,
  toggleTodo,
  deleteTodo,
  clearCompleted,
  FilterType,
  getStats,
} from '@/lib/todo-store';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

export default function TodoList() {
  const [todos, setTodos] = useState(() => getTodos());
  const [filter, setFilter] = useState<FilterType>('all');
  const [stats] = useState(() => getStats());

  const refresh = useCallback(() => {
    setTodos(getTodos());
  }, []);

  const handleAdd = (todo: any) => {
    refresh();
  };

  const handleToggle = (id: string) => {
    toggleTodo(id);
    refresh();
  };

  const handleDelete = (id: string) => {
    deleteTodo(id);
    refresh();
  };

  const handleClearCompleted = () => {
    clearCompleted();
    refresh();
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="w-full max-w-xl mx-auto">
      <TodoInput onAdd={handleAdd} />

      <div className="flex gap-2 mb-4">
        {(['all', 'active', 'completed'] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f === 'all' ? '全部' : f === 'active' ? '未完成' : '已完成'}
          </button>
        ))}
      </div>

      <div className="space-y-2 mb-4">
        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-400 py-8">暂无待办事项</p>
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

      {stats.completed > 0 && (
        <button
          onClick={handleClearCompleted}
          className="text-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          清除已完成 ({stats.completed})
        </button>
      )}
    </div>
  );
}
