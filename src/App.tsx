import './App.css'
import TodoItem from "./components/TodoItem";
import TodoTable from "./components/TodoTable";
const props = ['First todo', 'Second todo', 'Third todo', 'Fourth todo', 'First todo', 'Second todo', 'Third todo', 'Fourth todo']
function App() {

  return (
      <TodoTable title="Do Today!">{props}</TodoTable>
  )
}

export default App