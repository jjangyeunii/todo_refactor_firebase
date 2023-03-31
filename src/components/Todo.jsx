import styles from "./Todo.module.css";
import { BsPencilSquare } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
// import axios from "axios";

const Todo = ({
  todo,
  onSetStaus,
  onDeleteTodo,
  onUpdateTodo,
  onCheckedTodo,
}) => {
  const { id, text, status } = todo;
  const [value, setValue] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange = (e) => {
    const status = e.target.checked ? "completed" : "active";
    onSetStaus({ ...todo, status });
  };
  const handleDelete = () => {
    // axios
    //   .delete(`/todos/${id}`)
    //   .then(() => onDeleteTodo(todo))
    //   .catch((err) => console.log(err));
  };
  const handleChangeUpdate = (e) => setValue(e.target.value);
  const handleUpdate = () => {
    setIsEditMode(!isEditMode);
    // axios
    //   .patch(`/todos/${id}`, {
    //     text: value,
    //   })
    //   .then((res) => {
    //     onUpdateTodo(res.data, res.data.text);
    //     console.log(res.data.value);
    //     console.log(res.data);
    //   })
    //   .catch((err) => console.log(err));
  };
  const handlecheck = (e) => {
    // if (e.target.checked) {
    //   axios
    //     .patch(`/todos/${id}`, { status: "completed" })
    //     .then((res) => {
    //       onCheckedTodo(res.data, res.data.status);
    //       console.log(res.data);
    //     })
    //     .catch((err) => console.log(err));
    // } else {
    //   axios
    //     .patch(`/todos/${id}`, { status: "active" })
    //     .then((res) => {
    //       onCheckedTodo(res.data, res.data.status);
    //       console.log(res.data);
    //     })
    //     .catch((err) => console.log(err));
    // }
  };

  return (
    <li className={styles.todo}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id={id}
        checked={status === "completed"}
        onClick={handlecheck}
        onChange={handleChange}
      />
      {isEditMode ? (
        <input
          className={styles.update}
          type="text"
          value={value}
          onChange={handleChangeUpdate}
        />
      ) : (
        <label className={styles.text} htmlFor={id}>
          {text}
        </label>
      )}
      <span className={styles.icon}>
        <button className={styles.button} onClick={handleUpdate}>
          <BsPencilSquare />
        </button>
      </span>
      <span className={styles.icon} onClick={handleDelete}>
        <button className={styles.button}>
          <FaTrashAlt />
        </button>
      </span>
    </li>
  );
};

export default Todo;
