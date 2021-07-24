import React from 'react';
import Navbar from './components/Navbar';
import UserProfile from './pages/UserProfile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient } from '@apollo/client';
function App() {
	return (
		<Router>
				<>
					<Navbar />
					<Switch>

					</Switch>
				</>
		</Router>
	)
}
export default App;