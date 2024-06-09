import SearchBar from './components/searchBar/SearchBar';
import AllDogs from './components/dogs/AllDogs';


function App() {
  return (
    <div className="App container">
        <h1 className="text-center my-3">Make My Sledge</h1>
        <div className=" d-flex justify-content-center align-items-center w-100">
          <SearchBar />
        </div>
        <AllDogs />
    </div>
  );
}

export default App;

