import { useState, useEffect } from 'react';
import '../styles/App.scss';
import ls from '../services/localStoraged';

function App() {
  
  //HOOKS USE STATE
  const [collapsed, setCollapsed] = useState (['', 'collapsed', 'collapsed']);
  const [tasks, setTasks] = useState (ls.get('tasks', []));
  const [newTask, setNewTask] = useState ({
    task: '',
    completed: false,
  });
  const [filter, setFilter] = useState('All');

  //EVENTS
  const handleClick = (ev) => {
    if(ev.target.id === "All"){
      setCollapsed(['', 'collapsed', 'collapsed']);
    } if (ev.target.id === "Active"){
      setCollapsed([ 'collapsed', '', 'collapsed']);
    } if (ev.target.id === "Completed"){
      setCollapsed(['collapsed', 'collapsed', '']);
    }

    setFilter(ev.target.id);
   
  }

  const handleNewTask = (ev) => {
    setNewTask({...newTask,
      task: ev.target.value,
    });
  }

  const handleAddTask = (ev) => {
    ev.preventDefault();
    setTasks([
      ...tasks, newTask
    ]);
    setNewTask({
      task: '',
      completed: false,
    });

  }

  const handleCompleted = (ev) => {
    
    const index = ev.currentTarget.id;
    tasks.map((task) => {
      if (task.task === index) {
        return task.completed = !task.completed;
      }
    })

    setTasks([...tasks]);
    console.log(tasks[index].task);
    

   
  }

  //FUNCTION RENDER
  const htmlTasks = tasks
  .filter((task) => {
    if (filter === "Active"){
      return task.completed === false;
    } if (filter === "Completed"){
      return task.completed === true;
    } 
    return tasks;
  })
  .map((task, index) => {
    console.log(task);
    return (
      <li className="task-checkbox" key={index} onClick={handleCompleted} id={task.task} value={filter}>
        <input type="checkbox" checked={task.completed} completed={task.completed} className="checkbox" value={index} />
       <p class="text-checkbox" id={task.task}>{task.task}</p>
     </li>
     
    )
  });

  //SAVE ALL TASKS TO LOCAL STORAGED
  ls.set('tasks', tasks);

  return (
    <div>
      <header>
        <h1 className="title-header">#todo</h1>
      </header>

      <main className="main">
       <nav className="nav-menu">
          <ul className="nav-menu-list">
            <li className="item" id="All" onClick={handleClick} >All
                <div className={"rectangle"+collapsed[0]} id="All"></div>
            </li>
            <li className="item" id="Active" onClick={handleClick} >Active
                <div className={"rectangle"+collapsed[1]} id="Active"></div>
            </li>
            <li className="item" id="Completed" onClick={handleClick} >Completed
                <div className={"rectangle"+collapsed[2]} id="Completed"></div>
            </li>
          </ul>
        </nav>
        <form action="" className="form">
        <input type="text" value={newTask.task} placeholder="add a new task" className="input" onChange={handleNewTask}/>
        <button className="button" onClick={handleAddTask}>Add</button>
        </form>
        <ul className="list-checkbox">
          {htmlTasks}
        </ul>
      </main>
      <footer className="footer">
        <h4 className="footer-text">created by OlgaRG &copy;2022</h4>
      </footer>
    </div>
  );
}

export default App;
