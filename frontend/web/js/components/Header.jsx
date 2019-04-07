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
        chats: PropTypes.object,
        push: PropTypes.func.isRequired,
        isLoading: PropTypes.bool
    };

    handleLink = (link) => {
        this.props.push(link);
    };

    render() {
        if (this.props.isLoading) {
            return '';
        }

        return (
            <div className='header'>
                <div className='header__chat-name'>
                    {
                        typeof(this.props.chats[this.props.chatId]) !== 'undefined'
                            ? this.props.chats[this.props.chatId].name
                            : 'Идет загрузка'
                    }
                </div>
                <div className='header__message-count'>
                    Messages: {
                        typeof(this.props.chats[this.props.chatId]) !== 'undefined'
                            ? this.props.chats[this.props.chatId].messages.length
                            : 0
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
    isLoading: chatsReducer.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators({ push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);