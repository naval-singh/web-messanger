import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import PrivateRoute from './componants/UI/PrivateRoute';
import HomePage from './containers/HomePage';
import SigninPage from './containers/SigninPage';
import SignupPage from './containers/SignupPage';

function App() {
  return (
    <div className="App">
      <Router>
        {/* Anyone can access these routes */}
        <Route path='/signin' component={SigninPage} />
        <Route path='/signup' component={SignupPage} />

        {/* Only logged in user can access these routes */}
        <PrivateRoute path='/' exact component={HomePage} />
      </Router>
    </div>
  );
}

export default App;
