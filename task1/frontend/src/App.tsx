import { use } from "react";
import ConversationDetail from "./components/ConversationDetail"
import ConversationList from "./components/ConversationList"
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const themeContext = use(ThemeContext);
  if (!themeContext) return null;

  const { theme } = themeContext;
  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className="h-screen w-full bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
        <ConversationList />
        <ConversationDetail />
      </div>
    </div>
  )
}

export default App
