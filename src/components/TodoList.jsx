import styles from "./TodoList.module.css";
import MakeTodo from "./MakeTodo.jsx";
import Todo from "./Todo.jsx";
import { useEffect, useState } from "react";
// import axios from "axios";
import Calendar from "react-calendar";
import "../App.css";
import moment from "moment";
import useTodoList from "../hooks/useTodoList";
import useMode from "../hooks/useMode";

const TodoList = ({ currentTab }) => {
  const [todos, setTodos] = useState([]);
  const [value, onChange] = useState(new Date());
  const {
    TodoListQuery: { isLoading, data: todolist },
  } = useTodoList();
  const {
    ModeQuery: { data: mode },
  } = useMode();

  useEffect(() => {
    // const todos = getTodoList();
    !isLoading && console.log(todolist);
    console.log(mode);
    // axios
    //   .get("/todos")
    //   .then((res) => {
    //     setTodos(res.data);
    //   })
    //   .catch((err) => console.log(err));
  }, [todolist, mode]);

  const handleMakeTodo = (makedTodo) => setTodos([...todos, makedTodo]);
  const handleSetStatus = (setStatesTodo) =>
    setTodos(
      todos.map((todo) => (todo.id === setStatesTodo.id ? setStatesTodo : todo))
    );
  const handleDeleteTodo = (deletedTodo) =>
    setTodos(todos.filter((todo) => todo.id !== deletedTodo.id));
  const handleUpdateTodo = (updatedTodo, text) =>
    setTodos(
      todos.map((todo) =>
        todo.id === updatedTodo.id ? { ...todo, text } : todo
      )
    );
  const handleCheckedTodo = (checkedTodo, status) =>
    setTodos(
      todos.map((todo) =>
        todo.id === checkedTodo.id ? { ...todo, status } : todo
      )
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
      <ul className={styles.todos}>
        <h1>{moment(value).format("YYYY년 MM월 DD일")}</h1>
        {filteredTodoList.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onSetStaus={handleSetStatus}
            onDeleteTodo={handleDeleteTodo}
            onUpdateTodo={handleUpdateTodo}
            onCheckedTodo={handleCheckedTodo}
          />
        ))}
      </ul>
      <MakeTodo onMakeTodo={handleMakeTodo} />
    </section>
  );
};

export default TodoList;

const getTabTodos = (todos, tab) => {
  if (tab === "all") return todos;
  return todos.filter((todo) => todo.status === tab);
};
