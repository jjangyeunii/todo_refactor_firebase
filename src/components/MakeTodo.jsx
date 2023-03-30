import styles from "./MakeTodo.module.css";
// import shortid from "shortid";
import { useState } from "react";
// import axios from "axios";

const MakeTodo = ({ onMakeTodo }) => {
  const [value, setValue] = useState("");
  const handleChange = (e) => setValue(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length === 0) {
      return;
    }
    // axios
    //   .post("/todos", {
    //     id: shortid.generate(),
    //     text: value,
    //     status: "active",
    //   })
    //   .then((res) => {
    //     onMakeTodo(res.data);
    //   })
    //   .catch((err) => console.log(err));
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
