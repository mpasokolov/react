import React from 'react';
import ChatList from './ChatList';
import Header from './Header';
import Profile from './Profile';
import MessageField from './MessageField';
import '../../css/layout.sass';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {validateToken} from '../actions/authActions';
import {withAuth} from './auth';

class Layout extends React.Component{
    static propTypes = {
        token: PropTypes.string,
        isAuthorized: PropTypes.bool,
        isLoading: PropTypes.bool,
        chatId: PropTypes.string,
        profile: PropTypes.bool,
        validateToken: PropTypes.func
    };

    componentDidMount() {
        //let token =  getCookie('jwt_token');
        //if (!token || token === '') {
            //return;
        //}

        //this.props.validateToken();
    }

    render() {
        // if (this.props.isLoading) {
        //     return <div className='layout__loading'>Загрузка...</div>;
        // }

        //if (!this.props.isAuthorized) {
           // return <Login />;
        //}

        return (
            <div className='layout'>
                <div className='layout__left-side'>
                    <ChatList />
                </div>
                <div className='layout__right-side'>
                    {!this.props.profile && <Header chatId = {this.props.chatId} />}
                    {!this.props.profile && <MessageField chatId = {this.props.chatId}/>}
                    {this.props.profile && <Profile/>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ authReducer, chatsReducer }) => ({
    isAuthorized: authReducer.isAuthorized,
    isLoading: chatsReducer.isLoading,
    token: authReducer.token
});

const mapDispatchToProps = dispatch => bindActionCreators({ validateToken }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);