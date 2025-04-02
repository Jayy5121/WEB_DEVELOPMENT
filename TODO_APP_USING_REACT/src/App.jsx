import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../components/Navbar';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [showFinished, setshowFinished] = useState(true);

  // useEffect(() => {
  //   let todoString = localStorage.getItem("todos")
  //   if(todoString){
  //     let todos = JSON.parse(todoString)
  //     setTodos(todos)
  //   }
  // }, [])
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      try {
        let todos = JSON.parse(todoString);
        setTodos(todos);
      } catch (error) {
        console.error("Error parsing todos from localStorage:", error);
        setTodos([]); // Reset to an empty array if JSON is corrupted
      }
    } else {
      setTodos([]); // Initialize with an empty array if nothing is stored
    }
  }, []);
  

  const toggleChange = (e) => {
    setshowFinished(!showFinished)
  }

  const saveTodos = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const HandleAdd = () => {
    if (todo.trim()==="") return
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveTodos()
  }

  const HandleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id!== id});
    setTodos(newTodos)  
    saveTodos()
  }

  const HandleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveTodos()
  }

  const HandleDelete = (id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos)
    saveTodos()
  }



  return (
    <>
      <Navbar />
      <div className="bg-gray-200 min-h-screen p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Todo List</h1>
        
        <div className="flex justify-center mt-4">
          <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} 
            className="border-2 border-gray-300 p-2 rounded-md w-80" />
          <button onClick={HandleAdd} 
            className="bg-violet-800 cursor-pointer hover:bg-violet-700 p-2 py-1 font-bold text-white rounded-md mx-2">
            Add
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <input type="checkbox" onChange={toggleChange} checked={showFinished} />
          <label className="ml-2">Show Completed Todos</label>
        </div>

        <div className="mt-4">
          {todos.map((t) => {
            return (showFinished || !t.isCompleted) ? (
              <div key={t.id} className="flex justify-between bg-white shadow-md p-2 my-2 rounded-md">
                <input type="checkbox" name={t.id} checked={t.isCompleted} onChange={HandleCheckbox} />
                <span className={t.isCompleted ? "line-through text-gray-500" : "text-black"}>{t.todo}</span>
                <div>
                  <button onClick={(e) => HandleEdit(e, t.id)} 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md mx-1">
                    Edit
                  </button>
                  <button onClick={() => HandleDelete(t.id)} 
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md">
                    Delete
                  </button>
                </div>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}

export default Todo;
