import React from "react";

function AddTodoForm() {
  return (
    <form className="space">
      <label htmlFor="todoTitle">Title</label>
      <input id="todoTitle"></input>
      <button>Add</button>
    </form>
  );
}

export default AddTodoForm;
