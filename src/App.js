import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// component
import ViewRecipe from './Containers/ViewRecipe/ViewRecipe';
import UpdateRecipe from './Containers/UpdateRecipe/UpdateRecipe';
import Login from './Containers/Login/Login';
import ListRecipe from './Containers/ListRecipe/ListRecipe';
import CreateRecipe from './Containers/CreateRecipe/CreateRecipe';

function App() {
  return (
    <div>
      <div className='__header'>
        <div className='__title'>
          <h2>My Recipes</h2>
        </div>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/ListRecipe' />}></Route>
          <Route path='/ViewRecipe' element={<ViewRecipe/>}></Route>
          <Route path='/UpdateRecipe' element={<UpdateRecipe/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
          <Route path='/ListRecipe' element={<ListRecipe/>}></Route>
          <Route path='/CreateRecipe' element={<CreateRecipe/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
