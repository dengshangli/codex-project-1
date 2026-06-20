import TodoList from '@/components/TodoList';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
              TODO
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">待办事项</h1>
            <p className="text-sm text-muted-foreground">管理你的日常待办事项</p>
          </div>
        </div>

        <TodoList />
      </div>
    </div>
  );
}
