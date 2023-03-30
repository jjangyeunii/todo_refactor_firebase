import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import { DarkModeProvider } from "./context/DarkModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const tabList = ["all", "active", "completed"];
  const [currentTab, setCurrentTab] = useState(tabList[0]);
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <Header
          tabList={tabList}
          currentTab={currentTab}
          onTabChange={setCurrentTab}
        />
        <TodoList currentTab={currentTab} />
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;
