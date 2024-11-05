import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { todos } = useSelector((state) => state.todos);

  return (
    <>
      <h1 className="text-center my-4 text-primary">Task List</h1>
      <p className="text-center lead">{`Total ${todos.length} task(s) `}</p>
    </>
  );
};

export default Navbar;
