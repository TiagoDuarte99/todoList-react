import { useTheme } from "../hooks/useTheme";

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="p-2">
      {darkMode ? "🌙 Modo Claro" : "🌞 Modo Escuro"}
    </button>
  );
};

export default ThemeToggle;
