import React from 'react';
import {List, ListItem} from 'material-ui/List';
import AddIcon from 'material-ui/svg-icons/content/add';
import { push } from 'react-router-redux';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import { createChat } from '../actions/chatsActions';
import connect from 'react-redux/es/connect/connect';

class ChatList extends React.Component{

    static propTypes = {
        chatsList: PropTypes.object,
        push: PropTypes.func.isRequired,
    };

    handleLink = (link) => {
        this.props.push(link);
    };

    handleAddChat() {
        console.log('create chat');
    }

    render() {
        let chatListComponents = [];
        for (let key in this.props.chatsList) {
            chatListComponents.push(
                <ListItem
                    key={ key }
                    primaryText={ this.props.chatsList[key].name}
                    rightIcon={ <CommunicationChatBubble/> }
                    onClick={ () => this.handleLink(`/chat/${key}/`) }
                />
            );
        }
        return (
            <List>
                <Subheader>Recent chats</Subheader>
                { chatListComponents }
                <ListItem
                    primaryText='Добавить новый чат'
                    leftIcon={ <AddIcon /> }
                    onClick={ this.handleAddChat }
                />
            </List>
        );
    }
}

const mapStateToProps = ({ chatsReducer }) => ({
    chatsList: chatsReducer.chatsList,
});

const mapDispatchToProps = dispatch => bindActionCreators({ createChat, push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);