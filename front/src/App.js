import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import Nav from './components/nav';
import ProductsList from './components/list';
import NewProduct from './components/add';
import UpdateProduct from './components/update';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <Route exact path='/' component={ProductsList}></Route>
      <Route exact path='/add' component={NewProduct}></Route>
      <Route exact path='/update/:id' component={UpdateProduct}></Route>

    </div>
  );
}

export default App;
