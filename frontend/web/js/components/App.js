import React from 'react';
import Layout from './Layout';
import { Switch, Route } from 'react-router-dom';
import InstallPopup from './InstallPopup';

export default class App extends React.Component {
    render() {
        return (
            [
                <InstallPopup key="popup" />,
                <Switch key='router'>
                    <Route exact path='/' component={ Layout } />
                    <Route exact path='/chats/:id/' render={ obj => <Layout chatId={ obj.match.params.id } /> } />
                    <Route exact path='/profile/' render={ () => <Layout profile={true } /> } />
                </Switch>
            ]
        );
    }
}