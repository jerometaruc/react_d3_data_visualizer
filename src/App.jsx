import './App.css'
import LinePlot from './components/LinePlot'

function App() {
  const sampleData = [30, 50, 80, 40, 90, 60, 70];

  return (
    <div className="App">
      <h1>Hello React + D3 world!</h1>
      <LinePlot data={sampleData}/>
    </div>
  )
}

export default App;
