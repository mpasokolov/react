import React from 'react';
import Layout from './Layout';
import Login from './Login';
import {Switch, Route, Redirect} from 'react-router-dom';
import InstallPopup from './InstallPopup';
import AuthProvider, {withAuth} from './auth';
import { PrivateRoute } from './PrivateRouter';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';


class App extends React.Component {
    static propTypes = {
        isTokenInValidate: PropTypes.bool,
    };

    render() {
        if (this.props.isTokenInValidate) {
            return <div className='app__loading'>Загрузка...</div>;
        }

        return (
            <AuthProvider>
                <Switch key='router'>
                    <Route exact path='/login/' render={ () => {
                        console.log('login');
                        {/*<Login />*/}
                    } } />
                    <PrivateRoute path='/' component={ Layout } />
                    <PrivateRoute path='/chats/:id/' render={ obj => <Layout chatId={ obj.match.params.id } /> } />
                    <PrivateRoute path='/profile/' render={ () => <Layout profile={ true } /> } />
                    <Redirect to = '/login'/>
                </Switch>
            </AuthProvider>
        );
    }
}

const mapStateToProps = ({ authReducer }) => ({
    isTokenInValidate: authReducer.isTokenInValidate,
});

const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);

