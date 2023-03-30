import styles from "./Header.module.css";
import { HiMoon, HiSun } from "react-icons/hi";
import { useDarkMode } from "../context/DarkModeContext";

const Header = ({ tabList, currentTab, onTabChange }) => {
  const { darkMode, clickDarkMode } = useDarkMode();
  return (
    <header className={styles.header}>
      <ul className={styles.tablist}>
        {tabList.map((tab, idx) => (
          <li key={idx}>
            <button
              className={`${styles.tab} ${
                currentTab === tab && styles.selected
              }`}
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
      <button className={styles.toggle} onClick={clickDarkMode}>
        {!darkMode && <HiMoon />}
        {darkMode && <HiSun />}
      </button>
    </header>
  );
};

export default Header;
