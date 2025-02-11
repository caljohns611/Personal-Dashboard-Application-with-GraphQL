import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_TODOS = gql`
  query GetUserTodos($userId: ID!) {
    user(id: $userId) {
      todos {
        id
        title
        completed
      }
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodoCompletion($todoId: ID!, $completed: Boolean!) {
    updateTodoCompletion(todoId: $todoId, completed: $completed) {
      id
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($todoId: ID!) {
    deleteTodo(todoId: $todoId) {
      success
    }
  }
`;

const Todos = ({ userId }) => {
  const { loading, error, data, refetch } = useQuery(GET_TODOS, { variables: { userId } });
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  if (loading) return <p>Loading todos...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleToggle = async (todo) => {
    await toggleTodo({ variables: { todoId: todo.id, completed: !todo.completed } });
    refetch();
  };

  const handleDelete = async (todoId) => {
    await deleteTodo({ variables: { todoId } });
    refetch();
  };

  return (
    <div>
      <h2>Todos</h2>
      {data.user.todos.map((todo) => (
        <div key={todo.id}>
          <p>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo)}
            />
            {todo.title}
          </p>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Todos;