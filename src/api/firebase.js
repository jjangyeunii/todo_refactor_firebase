import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, set } from "firebase/database";
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

// mode를 가져오는 함수
export async function getMode() {
  return get(ref(database, "mode")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [{ type: "light" }];
    });
}
