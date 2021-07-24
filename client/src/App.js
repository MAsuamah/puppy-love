import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient } from '@apollo/client';
function App() {
	return (
		<Router>
				<>
					<Navbar />
					<Switch>
							<Route exact path='/' component={UserProfile} />
							<Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
					</Switch>
				</>
		</Router>
	)
}
export default App;