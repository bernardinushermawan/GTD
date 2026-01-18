import './App.css';
import { useState } from 'react';

function App() {
  const [task, setTask] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    status: 'Not Started'
  });
  const [status, setStatus] = useState(['Not Started' , 'In Progress' , 'Completed'])
  const [editingId, setEditingId] = useState(null);
  const [editingFormData, setEditingFormData] = useState({});

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  }

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
  };

  function addTask(e){
    e.preventDefault();
    const newTask = { ...formData, id: Date.now() };
    setTask([...task, newTask]);
    setFormData({ name: '', description: '', date: '', status: 'Not Started' });
  }

  function deleteTask(index){
    const updateTask = task.filter((_,i) => i !== index);
    setTask(updateTask);
  }

  return (
    <div className="App">
      <h1>Todo List</h1>

      <div className='wrapper'>
        <div className='container'>
          <h2>Add New Task</h2>
          <form>
            <input 
              type="text"   
              id='task' 
              placeholder='Task Name'
              value={formData.name}
              name='name'
              onChange={handleChange}
            />
            <textarea 
              name="description" 
              id="description"
              placeholder='Task Description'
              value={formData.description}
              onChange={handleChange}
              ></textarea>

            <div className='dateRow'>
              <label>Due Date: </label>
              <input type="date" name='date' id='date' value={formData.date} onChange={handleChange}/>
            </div>
            
            <div className='radioGroup'>
              {status.map((element, index) =>
                <label key={index}>
                  <input type="radio" name='status' checked={formData.status === element} value={element} onChange={handleChange}/>
                  {element}
                </label>
              )}
            </div>

            <button type='submit' className='btnAdd' onClick={addTask}>Add task</button>
          </form>
        </div>
      </div>

      <h2>Filter Tasks</h2>
      <div className='wrapper'>
        <div className='radioGroup'>
            {status.map((element, index) =>
              <label key={index}>
                <input type="checkbox" defaultChecked/>
                {element}
              </label>           
            )}
        </div>
      </div>
      
      {task.map((element, index) =>
        <div key={index} id='taskContainer'>
          <div id='firstRow'>
            <p>{element.name}</p>
            <div>
              <button id='edtBtn'>Edit</button>
              <button id='dltBtn' onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </div>
          <p className='p'>{element.description}</p>
          <p className='p'>Due Date: {element.date}</p>
          <p className='p'>Status: {element.status}</p>
        </div>
      )}

    </div>
  );
}

export default App;
