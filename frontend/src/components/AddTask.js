import React, { useState } from "react";
import { Button,Form, } from "react-bootstrap";
import { addTaskToList } from "../slices/tasksSlice";
import { useDispatch } from "react-redux";

const AddTask = () => {
    const dispatch = useDispatch()
    const [newTask, setNewTask] = useState('');
    
    const addTask = (e) => {
        e.preventDefault()
        console.log({newTask})
        dispatch(addTaskToList({newTask}))
        setNewTask('')
    }

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
      <section className="text-end mx-2 col-auto">
        <Button 
           variant="primary" 
           type="submit" 
           onClick={(e) =>addTask(e)}
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