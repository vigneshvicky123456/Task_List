import React,{useState,useEffect} from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskInList } from "../slices/tasksSlice";

const MyVerticallyCenteredModal = (props) => {
    const {selectedTask} = useSelector((state) => state.todos);
    const [newTask,setNewTask] = useState('');
    const [id, setId] = useState(0);
    const dispatch = useDispatch()

    const updateTask = () => {
        props.onHide()
        dispatch(updateTaskInList({id,newTask}))
    };

    useEffect(() => {
        if (Object.keys(selectedTask).length !== 0){
          setNewTask(selectedTask.newTask)
          setId(selectedTask.id)
        }
    }, [selectedTask]);
    
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Task Title"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="text-end">
            <Button 
               variant="primary" 
               type="submit" 
               onClick={(e) => updateTask(e)}
            >
              Update Task
            </Button>
          </div>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;