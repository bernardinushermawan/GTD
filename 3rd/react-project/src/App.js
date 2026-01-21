import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [task, setTask] = useState([]);
  const [newName,setName] = useState("");
  const [newDescription,setDescription] = useState("");
  const [newDate,setDate] = useState("");
  const [newStatus,setNewStatus] = useState("Not Started");
  const [statusOptions] = useState(['Not Started' , 'In Progress' , 'Completed']);
  const [filterStatus, setFilterStatus] = useState(['Not Started' , 'In Progress' , 'Completed']);
  const [editing, setEditing] = useState(null)

  const addTask = (e)=> {
    e.preventDefault();
    const newTask = {
      id: crypto.randomUUID(),
      name: newName,
      description: newDescription,
      date: newDate,
      status: newStatus
    }
    const updatedTask = [...task, newTask];

    saveTasks(updatedTask);
    resetForm();
  }

  const updateTask = (id) => {
    const updatedTask = task.map(t => 
      t.id === id ? 
      { ...t,
        name: newName,
        description: newDescription,
        date: newDate,
        status: newStatus 
      }:t
    );
    saveTasks(updatedTask);
    cancelEdit();
  };

  const saveTasks = (data) => {
    setTask(data);
    localStorage.setItem('task' , JSON.stringify(data));
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setDate("");
    setNewStatus("Not Started");
  }

  useEffect(()=>{
    let savedTask = JSON.parse(localStorage.getItem('task'));
    if(savedTask){
      setTask(savedTask);
    }
  },[])

  const startEditing= (t) => {
    setEditing(t.id);
    setName(t.name);
    setDescription(t.description);
    setDate(t.date);
    setNewStatus(t.status);

    resetForm()
  }

  const cancelEdit = () => {
    setEditing(null);
    resetForm();
  };

  function deleteTask(id){
    const updateTask = task.filter(t => t.id !==id);
    saveTasks(updateTask);
  }

  function handleFilterChange(status) {
    setFilterStatus(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]               
    );
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
              value={newName}
              name='name'
              onChange={(e) => setName(e.target.value)}
            />
            <textarea 
              name="description" 
              id="description"
              placeholder='Task Description'
              value={newDescription}
              onChange={(e) => setDescription(e.target.value)}
              ></textarea>

            <div className='dateRow'>
              <label>Due Date: </label>
              <input 
                type="date" 
                name='date' 
                id='date' 
                value={newDate} 
                onChange={(e)=>setDate(e.target.value)}
              />
            </div>
            
            <div className='radioGroup'>
              {statusOptions.map(opt => (
                <label key={opt}>
                  <input 
                    type="radio" 
                    name='status' 
                    checked={newStatus === opt} 
                    value={opt} 
                    onChange={(e)=>setNewStatus(e.target.value)}/>
                  {opt}
                </label>
              ))}
            </div>

            <button type='submit' className='btnAdd' onClick={addTask}>Add task</button>
          </form>
        </div>
      </div>

      <h2>Filter Tasks</h2>
      <div className='wrapper'>
        <div className='radioGroup'>
            {statusOptions.map((element, index) =>
              <label key={index}>
                <input 
                  type="checkbox" 
                  checked={filterStatus.includes(element)}
                  onChange={() => handleFilterChange(element)}
                />
                {element}
              </label>           
            )}
        </div>
      </div>
      
      {task.filter(t => filterStatus.includes(t.status)).map((element) => (
        <div className='task-item' key={element.id}>
          {editing === element.id ? (
            //editing display
            <div className='taskContainer'>

              <div className='firstRow'>
                <div className='input'>
                  <label>Task Name:</label>
                  <input 
                    type="text" 
                    className='edtInput' 
                    placeholder='Task Name'
                    value={newName}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <button className='edtBtn' onClick={() => updateTask(element.id)}>Save</button>
                  <button className='dltBtn' onClick={cancelEdit}>Cancel</button>
                </div>
              </div>

              <div className='input'>
                <label>Task Description:</label>
                <input 
                  type="text" 
                  className='edtInput' 
                  placeholder='Task Description' 
                  value={newDescription}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className='input'>
                <label>Due Date:</label>
                <input 
                  type="date" 
                  className='edtInput'
                  value={newDate}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className='input'>
                <label>Status:</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  {statusOptions.map(opt => 
                    <option value={opt} key={opt}>
                      {opt}
                    </option>
                  )}
                </select>
              </div>
            </div>

          ) : (

            //normal display
            <div key={element.id} className='taskContainer'>
            <div className='firstRow'>
              <p>{element.name}</p>
              <div>
                <button className='edtBtn' onClick={() => startEditing(element)}>Edit</button>
                <button className='dltBtn' onClick={() => deleteTask(element.id)}>Delete</button>
              </div>
            </div>
            <p className='p'>{element.description}</p>
            <p className='p'>Due Date: {element.date}</p>
            <p className='p'>Status: {element.status}</p>
          </div>
          )}
        </div>
      ))}
    </div>
  );
}
export default App;
