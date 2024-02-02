import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoeList from './ShoeList'
import ShoeForm from './ShoeForm'





import HatList from "./HatList";
import HatForm from "./HatForm";


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />


          <Route path="/shoes" element={<ShoeList />} />
          <Route path="/shoes/new" element={<ShoeForm />} />
          <Route path="/hats" element={<HatList />} />


        </Routes>
      </div>
    </BrowserRouter>
  );
}

console.log()
export default App;
