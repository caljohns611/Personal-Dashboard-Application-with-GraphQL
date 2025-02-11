import Profile from './components/Profile';
import Posts from './components/Posts';
import Albums from './components/Albums';
import Todos from './components/Todo';
import React from 'react'

const App = () => {
  const userId = '1';

  return (
    <div>
      <h1>User Dashboard</h1>
      <Profile userId={userId} />
      <Posts userId={userId} />
      <Albums userId={userId} />
      <Todos userId={userId} />
    </div>
  );
};

export default App;