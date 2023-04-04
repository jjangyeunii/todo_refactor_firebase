import styles from "./TodoList.module.css";
import MakeTodo from "./MakeTodo.jsx";
import Todo from "./Todo.jsx";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../App.css";
import moment from "moment";
import useTodoList from "../hooks/useTodoList";

const TodoList = ({ currentTab }) => {
  const [todos, setTodos] = useState([]);
  const [value, onChange] = useState(new Date());
  const {
    TodoListQuery: { isLoading, data: todolist },
  } = useTodoList();

  useEffect(() => {
    setTodos(todolist);
    console.log(todolist);
  }, [todolist]);

  const handleSetStatus = (setStatesTodo) =>
    setTodos(
      todos.map((todo) => (todo.id === setStatesTodo.id ? setStatesTodo : todo))
    );
  const filteredTodoList = getTabTodos(todos, currentTab);

  return (
    <section className={styles.container}>
      <section className={styles.calendarbox}>
        <Calendar
          className={styles.calendar}
          calendarType="US"
          onChange={onChange}
          value={value}
        />
      </section>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className={styles.todos}>
          <h1>{moment(value).format("YYYY년 MM월 DD일")}</h1>
          {filteredTodoList &&
            filteredTodoList.map((todo) => (
              <Todo key={todo.id} todo={todo} onSetStaus={handleSetStatus} />
            ))}
        </ul>
      )}
      <MakeTodo />
    </section>
  );
};

export default TodoList;

const getTabTodos = (todos, tab) => {
  if (tab === "all") return todos;
  return todos.filter((todo) => todo.status === tab);
};
