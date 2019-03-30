import React from 'react';
import {List, ListItem} from 'material-ui/List';
import { Link } from 'react-router-dom';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import { createChat } from '../actions/chatsActions';
import connect from 'react-redux/es/connect/connect';

class ChatList extends React.Component{

    static propTypes = {
        chatsList: PropTypes.object,
    };

    render() {
        let chatListComponents = [];
        for (let key in this.props.chatsList) {
            chatListComponents.push(
                <Link key={key} to={`/chats/${key}`}>
                    <ListItem
                        key={key}
                        primaryText={ this.props.chatsList[key].name}
                        rightIcon={<CommunicationChatBubble/>}
                    />
                </Link>
            );
        }
        return (
            <List>
                <Subheader>Recent chats</Subheader>
                { chatListComponents }
            </List>
        );
    }
}

const mapStateToProps = ({ chatsReducer }) => ({
    chatsList: chatsReducer.chatsList,
});

const mapDispatchToProps = dispatch => bindActionCreators({ createChat }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);