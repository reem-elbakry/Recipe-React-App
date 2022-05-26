import './App.css';
import Pages from './pages/Pages';
import Category from './components/Category';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <Search/>
      <Category/>
      <Pages />
    </div>
  );
}

export default App;
