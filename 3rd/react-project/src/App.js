import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [task, setTask] = useState([]);
  const [newName,setName] = useState("");
  const [newDescription,setDescription] = useState("");
  const [newDate,setDate] = useState("");
  const [newStatus,setNewStatus] = useState("Not Started");
  const [status] = useState(['Not Started' , 'In Progress' , 'Completed']);
  const [filterStatus, setFilterStatus] = useState(['Not Started' , 'In Progress' , 'Completed']);

  const addTask = (e)=> {
    e.preventDefault();
    let newTask = {
      name: newName,
      description: newDescription,
      date: newDate,
      status: newStatus
    }

    let updatedTask = [...task];
    updatedTask.push(newTask);
    setTask(updatedTask);
    localStorage.setItem('task', JSON.stringify(updatedTask));

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

  const filteredTasks = task.filter(t =>
    filterStatus.includes(t.status)
  );

  function deleteTask(index){
    const updateTask = [...task];
    updateTask.splice(index, 1);

    localStorage.setItem('task' , JSON.stringify(updateTask));
    setTask(updateTask);
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
              {status.map((element, index) =>
                <label key={index}>
                  <input 
                    type="radio" 
                    name='status' 
                    checked={newStatus === element} 
                    value={element} 
                    onChange={(e)=>setNewStatus(e.target.value)}/>
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
      
      {filteredTasks.map((element, index) =>
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
