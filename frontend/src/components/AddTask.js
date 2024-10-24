import React, { useState, useEffect } from "react";
import { Button,Form, } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../slices/tasksSlice";

const AddTask = () => {

    const dispatch = useDispatch()
    const {selectTodo} = useSelector((state) => state.todos);
    const [newTask, setNewTask] = useState('');
    const [isEditting, setIsEditting] = useState(false);
    const [id, setId] = useState(0);
    
    const addTask = () => { 
    
      // check if input is empty
      if (!newTask.trim()) {
        return alert('Please type a input');
       }
       // Check if input starts with a number or symbol
       if (!/^[a-zA-Z]/.test(newTask)) {
        return alert('Input must start with a letter');
       }
       if (newTask.trim()) {
        dispatch(addTodo(newTask))
        setNewTask('')
      }
  };

  const updateTask = () => {
    dispatch(updateTodo({ id: id, task: newTask })); 
    setIsEditting(false); 
    window.location = "/";
    setNewTask('')
   };
 
  const cancel = () => {
    setIsEditting(false)
    setNewTask('')
  };
 
    useEffect(() => {
     if (Object.keys(selectTodo).length !== 0){
      setNewTask(selectTodo.task)
      setId(selectTodo.id)
      setIsEditting(true)
      }
    }, [selectTodo]);

  return (
    <div className=" text-align-center container">
       <section className="my-4 container">
          <Form className="row">
             <Form.Group className="mb-2 col-md-6" controlId="formBasicEmail">
               <Form.Control 
                   type="text" 
                   placeholder="Enter a Task.." 
                   value={newTask}
                   onChange={(e) => setNewTask(e.target.value)}
                />
              </Form.Group>
              {isEditting ? (
                 <section className="text-end col-auto">
                   <Button 
                      variant="primary" 
                      className="mx-3" 
                      onClick={ cancel } 
                   >
                     Cancel
                   </Button>
                   <Button 
                      variant="primary" 
                      onClick={(e) =>updateTask(e)} 
                   >
                     update Task
                   </Button>
                 </section>
              ) : (
                <section  className="text-end mx-2 col-auto">
                   <Button 
                      variant="primary" 
                      onClick={ addTask }
                   >
                     Add Task
                  </Button>
                </section>
              )}
           </Form>
        </section>
    </div>
  );
};

export default AddTask;