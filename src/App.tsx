import './App.css'
import TodoItem from "./components/TodoItem";
import TodoTable from "./components/TodoTable";
import DragAndDrop from "./components/DragAndDrop";
const props = ['First todo', 'Second todo', 'Third todo', 'Fourth todo', 'First todo', 'Second todo', 'Third todo', 'Fourth todo']
function App() {

  return (
      <DragAndDrop>
        <TodoTable title="Do Today!">{props}</TodoTable>
      </DragAndDrop>
  )
}

export default App