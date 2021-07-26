import React from 'react';
import AppNavbar from './components/NavBar';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
	request: operation => {
	  const token = localStorage.getItem('id_token');
  
	  operation.setContext({
		headers: {
		  authorization: token ? `Bearer ${token}` : ''
		}
	  });
	},
	uri: '/graphql'
  });

function App() {
	return (
		<ApolloProvider client={client}>
		<Router>

					<AppNavbar />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/user-profile' component={UserProfile} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
					</Switch>

		</Router>
		</ApolloProvider>
	)
}
export default App;