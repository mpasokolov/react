import React from 'react';
import ChatList from './ChatList';
import Header from './Header';
import MessageField from './MessageField';
import '../../css/layout.sass';
import PropTypes from 'prop-types';

export default class Layout extends React.Component{

    static propTypes = {
        chatId: PropTypes.string,
    };

    render() {
        const chatId = this.props.chatId ? this.props.chatId : '1';
        console.log(chatId);
        return (
            <div className='layout'>
                <div className='layout__left-side'>
                    <div className='chats-list'>
                        <ChatList />
                    </div>
                </div>
                <div className='layout__right-side'>
                    <Header chatId={chatId}/>
                    <div className='chat'>
                        <MessageField chatId={chatId}/>
                    </div>
                </div>
            </div>
        );
    }
}
