import './App.scss';
import News from './components/Weather/News/News';
import ToDoList from './components/Weather/ToDoList/ToDoList';
import Weather
 from './components/Weather/Weather';
const App = () => {

  return (
    <div>
      <Weather/>
      <ToDoList/>
      <News/>
    </div>
  )
}  

export default App;