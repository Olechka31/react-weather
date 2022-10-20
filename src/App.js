import "./App.css";
import Search from "./Search";
import Forecast from "./Forecast";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Search />
        <br />
        <Forecast />
      </div>
    </div>
  );
}

export default App;
