import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import '../../css/login.sass';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { login } from '../actions/authActions';
import connect from 'react-redux/es/connect/connect';
import { withAuth } from './auth';
import { Redirect } from 'react-router-dom';


export default class Login extends React.Component {
    static propTypes = {
        isAuthorized: PropTypes.bool,
        authorize: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
        };
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleLogin = () => {
        if (this.state.login.length > 0 &&  this.state.password.length > 0) {
            // const data = {
            //     login: this.state.login,
            //     password: this.state.password
            // };
            // this.props.login(data);
            this.props.authorize(this.state.login, this.state.password);
        }
    };

    render() {
        console.log('render');

        const style = {
            fontSize: 10,
            color: 'red',
            textTransform: 'capitalize'
        };

        return (
            <div className = 'login-page'>
                <div className = 'login-page__form'>
                    <h4>Авторизация:</h4>
                    <TextField
                        name = "login"
                        onChange = { this.handleInput }
                        hintText = "Логин"
                    /><br />
                    <br />
                    <TextField
                        name = "password"
                        onChange = { this.handleInput }
                        hintText = "Пароль"
                    /><br />
                    <RaisedButton
                        label = "Login"
                        style = {style}
                        onClick={ this.handleLogin }
                    />
                </div>
            </div>
        );
    }
}
// const mapStateToProps = ({ usersReducer }) => ({
//     isAuthorized: usersReducer.isAuthorized,
// });
//
// const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

// export default withAuth(({isAuthorized, authorize}) => (
//     isAuthorized ? <Redirect to='/' /> : <Login authorize = {authorize} isAuthorized={ isAuthorized} />
// ));