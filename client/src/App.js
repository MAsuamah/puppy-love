import React from 'react';
import AppNavbar from './components/NavBar';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient } from '@apollo/client';

function App() {
	return (
		<Router>

					<AppNavbar />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/user-profile' component={UserProfile} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
					</Switch>

		</Router>
	)
}
export default App;