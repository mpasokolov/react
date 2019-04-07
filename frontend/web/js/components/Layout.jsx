import React from 'react';
import ChatList from './ChatList';
import Header from './Header';
import Profile from './Profile';
import MessageField from './MessageField';
import '../../css/layout.sass';
import PropTypes from 'prop-types';

export default class Layout extends React.Component{

    static propTypes = {
        chatId: PropTypes.string,
        profile: PropTypes.bool
    };

    render() {
        const chatId = this.props.chatId ? this.props.chatId : '1';
        return (
            <div className='layout'>
                <div className='layout__left-side'>
                    <ChatList />
                </div>
                <div className='layout__right-side'>
                    {!this.props.profile && <Header chatId={chatId}/>}
                    {!this.props.profile && <MessageField chatId={chatId}/>}
                    {this.props.profile && <Profile/>}
                </div>
            </div>
        );
    }
}
