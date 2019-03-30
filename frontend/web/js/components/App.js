import React from 'react';
import Layout from './Layout';
import { Switch, Route } from 'react-router-dom';

export default class App extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={ Layout } />
                <Route exact path='/chats/:id/' render={ obj => <Layout chatId={ obj.match.params.id } /> } />
            </Switch>
        );
    }
}