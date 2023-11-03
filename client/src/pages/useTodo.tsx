import { useQuery } from 'react-query';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch('https://api.example.com/todos');
  if (!response.ok) {
    throw new Error('Failed to fetch todos.');
  }
  return response.json();
}

export function useTodos() {
  return useQuery<Todo[], Error>('todos', fetchTodos);
}
