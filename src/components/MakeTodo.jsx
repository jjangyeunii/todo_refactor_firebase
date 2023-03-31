import styles from "./MakeTodo.module.css";
import { useState } from "react";
import useTodoList from "../hooks/useTodoList";

const MakeTodo = ({ onMakeTodo }) => {
  const { addNewTodo } = useTodoList();
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length === 0) {
      return;
    }
    addNewTodo.mutate({ text: value, state: "active" });
    setValue("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Add Todo"
        value={value}
        onChange={handleChange}
      />
      <button className={styles.button}>+</button>
    </form>
  );
};

export default MakeTodo;
