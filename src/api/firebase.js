import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, remove, set } from "firebase/database";
import shortid from "shortid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// todos를 가져오는 함수
export async function getTodoList() {
  return get(ref(database, "todos")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    });
}

// todo를 추가하는 함수
export async function addTodo(text, status) {
  const id = shortid.generate();
  return set(ref(database, `todos/${id}`), {
    text,
    status,
    id,
  });
}

// todo를 삭제하는 함수
export async function removeTodo(id) {
  return remove(ref(database, `todos/${id}`));
}

// todo를 업데이트하는 함수
export async function updateTodoStatus(id, todo) {
  return set(ref(database, `todos/${id}`), todo);
}

// mode를 가져오는 함수
export async function getMode() {
  return get(ref(database, "mode")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [{ id: "1", type: "light" }];
    });
}

// mode를 세팅함수
export async function setMode(id, type) {
  return set(ref(database, `mode/${id}`), {
    id,
    type,
  });
}
