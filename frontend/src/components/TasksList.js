import React,{useState} from "react";
import { Button, Table } from "react-bootstrap";
import MyVerticallyCenteredModal from './UpdateTask';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTask,removeTaskFromList } from "../slices/tasksSlice";

const TasksList = () => {
  const {todos} = useSelector((state) => state.todos)
  const dispatch = useDispatch()

  const updateTask = (todo) => {
    console.log("update Task");
    setModalShow(true)
    dispatch(setSelectedTask(todo))
  };

  const deleteTask = (todo) => {
    console.log("delete task");
    dispatch(removeTaskFromList(todo))
  };

  const [modalShow,setModalShow] = useState(false)
  
  return (
    <>
          { todos && todos.map((todo) => (
              
                <ul className="p-1 text-center" key={todo.id} >
                  <li  className=" mb-2 px-3 text-start ">
                    {todo.newTask}
                    <Button
                       variant="primary" 
                       className="mx-2" 
                       onClick={() => updateTask(todo)} 
                    >
                       <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button 
                       variant="primary justify-content-end"
                       onClick={() => deleteTask(todo)}
                    >
                       <i className="bi bi-trash3"></i>
                    </Button>
                  </li>
              </ul>
            ))}
          
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default TasksList;