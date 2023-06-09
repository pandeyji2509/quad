import logo from './logo.svg';
import './App.css';
import Movie from './component/Movie';
import Detail from './component/Detail';
import BookTicket from './component/BookTicket';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/"
            exact element={<Movie />}>
        </Route>
        <Route path="/Detail/:id"
            exact element={<Detail />}>
          </Route>
          <Route path="/Book-ticket/:id"
            exact element={<BookTicket />}>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
