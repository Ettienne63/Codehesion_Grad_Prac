import {useState} from 'react';

function Home() {
  const [user] = useState(null);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {user ? (
        <p>Hello, {user.username}!</p>
      ) : (
        <p>Please log in or register to continue.</p>
      )}
    </div>
  );
}

export default Home;
