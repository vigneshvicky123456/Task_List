import React,{ useState, useEffect} from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, updateTodo, deleteTodo,getTodo } from "../slices/tasksSlice";

const TasksList = () => {

  const {todos} = useSelector((state) => state.todos)
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const handleClose = () => setShow(false);

  const handleShow = (id) =>{
    setShow(true)
    setId(id)
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleToggleComplete = (id, task, completed) => {
    dispatch(updateTodo({ id, task, completed: !completed }));
    window.location = "/";
  };

  const updateTask = (id,task) => {
    dispatch(getTodo(id,task));
  };

  const deleteTask = (id) => {
    setShow(false)
    dispatch(deleteTodo(id));
  };

  return (
    <>
      { todos && todos.map((todo) => ( 
          
        <ul className="p-1 text-center" key={todo.id} >
          <li  className=" mb-2 px-3 text-start ">
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.task}
            </span> 
            <Button  
               variant="success mx-2"  
               onClick={() => handleToggleComplete(todo.id, todo.task, todo.completed)}
            >
               {todo.completed ? 'Undo' : 'Complete'}
            </Button>
            <Button
               variant="primary" 
               className="mx-2" 
               onClick={() => updateTask(todo.id,todo.task)}
            >
               <i className="bi bi-pencil-square"></i>
            </Button> 
            <Button 
               variant="primary  justify-content-end"
               onClick={() => handleShow(todo.id)}
            >
               <i className="bi bi-trash3" ></i>
            </Button> 

            <Modal show={show} onHide={handleClose} >
              <Modal.Header closeButton>
                <Modal.Title>Delete Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are You Sure Want To Delete...!</Modal.Body>
              <Modal.Footer>
                 <Button 
                   variant="secondary" 
                   onClick={handleClose}
                 >
                   Cancel
                </Button>
                <Button 
                   variant="primary" 
                   onClick={() => deleteTask(id)}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </li>
        </ul>
       ))}   
    </>
  );
};

export default TasksList;