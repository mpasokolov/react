import React from 'react';
import '../../css/header.sass';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

import { push } from 'react-router-redux';

class Header extends React.Component{

    static propTypes = {
        chatId: PropTypes.string,
        defaultChat: PropTypes.number,
        chats: PropTypes.object,
        push: PropTypes.func.isRequired,
        isLoading: PropTypes.bool,
        emptyChatList: PropTypes.bool
    };

    handleLink = (link) => {
        this.props.push(link);
    };

    render() {
        if (this.props.isLoading) {
            return '';
        }

        const chatId = this.props.chatId || this.props.defaultChat;
        return (
            <div className='header'>
                <div className='header__chat-name'>
                    {
                        !this.props.emptyChatList
                            ? this.props.chats[chatId].name
                            : ''
                    }
                </div>
                <div className='header__message-count'>
                    {
                        !this.props.emptyChatList
                            ? 'Messages:' + this.props.chats[chatId].messages.length
                            : ''
                    }
                </div>
                <div className='header__profile'>
                    <IconButton tooltip="Profile" onClick={ () => this.handleLink('/profile') }>
                        <ActionHome />
                    </IconButton>
                </div>
            </div>

        );
    }
}

const mapStateToProps = ({chatsReducer }) => ({
    chats: chatsReducer.chatsList,
    defaultChat: chatsReducer.defaultChat,
    emptyChatList: chatsReducer.emptyChatList,
    isLoading: chatsReducer.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators({ push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);