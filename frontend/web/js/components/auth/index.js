import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {login, validateToken} from '../../actions/authActions';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

const {Provider, Consumer: AuthConsumer} = React.createContext();

class AuthProvider extends Component {
    static propTypes = {
        isAuthorized: PropTypes.bool,
        login: PropTypes.func,
    };

    authorize = (login, password) => {
        this.props.login({login: login, password: password});
    };

    render() {
        return (
            <Provider value = {{
                isAuthorized: this.props.isAuthorized,
                authorize: this.authorize,
            }}>
                {this.props.children}
            </Provider>
        );
    }
}

const mapStateToProps = ({ authReducer }) => ({
    isAuthorized: authReducer.isAuthorized,
});

const mapDispatchToProps = dispatch => bindActionCreators({ login, validateToken }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);




export function withAuth(WrappedComponent) {
    return class AuthHOC extends Component {
        render() {
            return (
                <AuthConsumer>
                    {contextProps => (
                        <WrappedComponent {...contextProps} {...this.props} />
                    )}
                </AuthConsumer>
            );
        }
    };
}