import React, { useState, useEffect } from "react";
import { Button, Modal, Tab, Tabs, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, updateTodo, deleteTodo } from "../slices/tasksSlice";

const TasksList = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);

  const [key, setKey] = useState("Undo");
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(0);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const [isEditting, setIsEditting] = useState(false)

  const filteredTasks = todos.filter((task) => {
    if (key === "Complete") return task.completed;
    if (key === "Undo") return !task.completed;
    return true;
  });

  const handleToggleComplete = (id, task, completed) => {
    dispatch(updateTodo({ id, task, completed: !completed }));
    dispatch(fetchTodos());
  };

  const editShow = (id, task) => {
    setNewTask(task);
    setEditId(id);
    setIsEditting(true)
  };

  const editClose = () => {
     setIsEditting(false)
    setNewTask("");
  };

  const updateTask = () => {
    dispatch(updateTodo({ id: editId, task: newTask }));
    setIsEditting(false);
    setNewTask("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(updateTodo({ id: editId, task: newTask }));
      setIsEditting(false)
      setNewTask("");
    } else if (e.key === "Escape") {
      setIsEditting(false)
      setNewTask("");
    }
  };

  const deleteShow = (id) => {
    setShow(true);
    setId(id);
  };

  const deleteClose = () => {
    setShow(false);
  };

  const deleteTask = (id) => {
    setShow(false);
    dispatch(deleteTodo(id));
  };

  useEffect(() => {
    dispatch(fetchTodos());
  });

  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className=" mb-3"
      >
        <Tab eventKey="Undo" title="Undo"></Tab>
        <Tab eventKey="Complete" title="Complete"></Tab>
        <Tab eventKey="all" title="all"></Tab>
      </Tabs>

      <ul className="p-1 text-center">
        {filteredTasks.map((todo) => (
          <li className=" mb-2 px-3 text-start " key={todo.id}>
            {editId === todo.id && isEditting === true ? (
              <div>
                <Form className="row">
                  <Form.Group
                    className="mb-2 col-md-6"
                    controlId="formBasicEmail"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Enter a Task.."
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                  </Form.Group>
                  <section className="text-end col-auto">
                    <Button
                      variant="primary"
                      className="mx-3"
                      onClick={editClose}
                    >
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={(e) => updateTask(e)}>
                      update Task
                    </Button>
                  </section>
                </Form>
              </div>
            ) : (
              <div>
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.task}
                </span>
                <Button
                  variant="success mx-2"
                  onClick={() =>
                    handleToggleComplete(todo.id, todo.task, todo.completed)
                  }
                >
                  {todo.completed ? "Undo" : "Complete"}
                </Button>
                <Button
                  variant="primary"
                  className="mx-2"
                  onClick={() => editShow(todo.id, todo.task)}
                >
                  <i className="bi bi-pencil-square"></i>
                </Button>
                <Button
                  variant="primary  justify-content-end"
                  onClick={() => deleteShow(todo.id)}
                >
                  <i className="bi bi-trash3"></i>
                </Button>

                <Modal show={show} onHide={deleteClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Delete Task</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are You Sure Want To Delete...!</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={deleteClose}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={() => deleteTask(id)}>
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TasksList;
