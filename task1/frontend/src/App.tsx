import ConversationDetail from "./components/ConversationDetail"
import ConversationList from "./components/ConversationList"

function App() {

  return (
    <>
      <div className="flex w-full h-screen overflow-hidden">
        <ConversationList />
        <ConversationDetail />
      </div>
    </>
  )
}

export default App
