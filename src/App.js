import React, {useState} from 'react';
import RegisterForm from './components/RegisterForm'
import CardGrid from './components/CardGrid'
import './App.css';

function App() {

  const [users, setUsers] = useState([])

  return (
    <div className="App">
      <RegisterForm setUsers={setUsers}/>
      <h2>Users:</h2>
      <CardGrid users={users} />
    </div>
  );
}

export default App;
