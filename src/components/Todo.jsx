import styles from "./Todo.module.css";
import { BsPencilSquare } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import useTodoList from "../hooks/useTodoList";

const Todo = ({ todo, onSetStaus }) => {
  const { id, text, status } = todo;
  const [value, setValue] = useState(text);
  const [isEditMode, setIsEditMode] = useState(false);
  const { deleteTodo, updateStatus } = useTodoList();

  const handleChange = (e) => {
    const status = e.target.checked ? "completed" : "active";
    onSetStaus({ ...todo, status });
  };
  const handleDelete = () => {
    if (window.confirm("todo를 삭제하시겠습니까?")) {
      deleteTodo.mutate(id);
    }
  };
  const handleChangeUpdate = (e) => setValue(e.target.value);
  const handleUpdate = () => {
    setIsEditMode(!isEditMode);
    updateStatus.mutate({ id, todo: { ...todo, text: value } });
  };
  const handlecheck = (e) => {
    if (e.target.checked) {
      updateStatus.mutate({ id, todo: { ...todo, status: "completed" } });
    } else {
      updateStatus.mutate({ id, todo: { ...todo, status: "active" } });
    }
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
