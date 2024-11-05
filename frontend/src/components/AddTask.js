import React, { useState } from "react";
import { Button,Form, } from "react-bootstrap";
import {  useDispatch } from "react-redux";
import { addTodo } from "../slices/tasksSlice";

const AddTask = () => {

    const dispatch = useDispatch()
    const [newTask, setNewTask] = useState('');
   
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
                <section  className="text-end mx-2 col-auto">
                   <Button 
                      variant="primary" 
                      onClick={ addTask }
                   >
                     Add Task
                  </Button>
                </section>
           </Form>
        </section>
    </div>
  );
};

export default AddTask;