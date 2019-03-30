import React from 'react';
import '../../css/header.sass';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

class Header extends React.Component{

    static propTypes = {
        chatId: PropTypes.string,
        chats: PropTypes.object,
        messages: PropTypes.object,
    };

    render() {
        return (
            <div className='header'>
                <div className='header__chat-name'> { this.props.chats[this.props.chatId].name } </div>
                <div className='header__message-count'>
                    Messages: {
                        typeof(this.props.messages[this.props.chatId]) !== 'undefined' ?
                            this.props.messages[this.props.chatId].length:
                            0
                    }
                </div>
            </div>

        );
    }
}

const mapStateToProps = ({ messageReducer, chatsReducer }) => ({
    messages: messageReducer.messages,
    chats: chatsReducer.chatsList
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);