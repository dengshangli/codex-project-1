import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Todo App</h1>
        <p className="text-gray-500">管理你的日常待办事项</p>
      </div>
      <TodoList />
    </div>
  );
}
