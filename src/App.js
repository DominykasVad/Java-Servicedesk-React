import {BrowserRouter as Router} from 'react-router-dom';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import {Provider} from 'react-redux';
import store from './store';
import {SnackbarProvider} from 'notistack';
import React from 'react';

function App() {
    return (
        <Router>
            <Provider store={store}>
                <SnackbarProvider maxSnack={3}>
                    <Header/>
                    <Content/>
                    <Footer/>
                </SnackbarProvider>
            </Provider>
        </Router>
    );
}

export default App;

// https://motherfuckingwebsite.com/
// https://bestmotherfucking.website/