import React from 'react';
import AppNavbar from './components/NavBar';
import AppFooter from './components/Footer';
import Home from './pages/Home';
import DogImage from './pages/DogImage';
import DogProfile from './pages/DogProfile';
import UserProfile from './pages/UserProfile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>

				<AppNavbar />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/user-profile' component={UserProfile} />
					<Route exact path='/dog-profile/:dogId' component={DogProfile} />
					<Route exact path='/dog-image/:imageId' component={DogImage} />
					<Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
				</Switch>
				<AppFooter/>

			</Router>
		</ApolloProvider>
	)
}
export default App;