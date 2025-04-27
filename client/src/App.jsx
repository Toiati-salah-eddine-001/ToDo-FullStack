import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', completed: false });

  // جلب التو-دو من الـ API
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  // إضافة تو-دو جديد
  const addTodo = () => {
    axios.post('http://127.0.0.1:8000/api/todos', newTodo)
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo({ title: '', description: '', completed: false });
      })
      .catch(error => console.error('Error adding todo: ', error));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Title"
        value={newTodo.title}
        onChange={e => setNewTodo({ ...newTodo, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newTodo.description}
        onChange={e => setNewTodo({ ...newTodo, description: e.target.value })}
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
}

export default App;
