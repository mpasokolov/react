import React from 'react';
import {List, ListItem} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddIcon from 'material-ui/svg-icons/content/add';
import { push } from 'react-router-redux';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import { createChat, loadChats } from '../actions/chatsActions';
import connect from 'react-redux/es/connect/connect';
import TextField from 'material-ui/TextField';
import '../../css/chatList.sass';

class ChatList extends React.Component{

    static propTypes = {
        chatsList: PropTypes.object,
        push: PropTypes.func.isRequired,
        createChat: PropTypes.func.isRequired,
        loadChats: PropTypes.func.isRequired,
        isLoading: PropTypes.bool,
        isLiteChat: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isHidden: false
        };
    }

    componentDidMount() {
        this.props.loadChats();
    }

    handleLink = (link) => {
        this.props.push(link);
    };

    handleKeyUp = (e) => {
        if (e.keyCode === 13) { // Enter
            this.handleSendMessage(this.state.name);
        }
    };

    handleAddChat = () => {
        if (this.state.name.length > 0) {
            const data = {name: this.state.name, admin: 1};
            this.props.createChat(data);
            this.setState({name: ''});
            this.handleViewInputField();
        }
    };

    handleViewInputField = () => {
        this.setState({isHidden: !this.state.isHidden}) ;
    };

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        if (this.props.isLoading) {
            return '';
        }

        //console.log('is lite = ' + this.props.isLiteChat);
        //console.log('type = ' + typeof(this.props.isLiteChat);


        let chatListComponents = [];
        for (let key in this.props.chatsList) {
            chatListComponents.push(
                <ListItem
                    key={ this.props.chatsList[key].id }
                    primaryText={ this.props.chatsList[key].name}
                    rightIcon={ <CommunicationChatBubble/> }
                    onClick={ () => this.handleLink(`/chats/${this.props.chatsList[key].id}/`) }
                    style={
                        {
                            backgroundColor: this.props.isLiteChat.length > 0 && key === this.props.isLiteChat
                                ? '#aaa8a8'
                                : 'white'
                        }
                    }
                />
            );
        }

        return (
            <div className='chat'>
                <div className='chat__list'>
                    <List>
                        <Subheader>Recent chats</Subheader>
                        { chatListComponents }
                        <ListItem
                            key = 'addChat'
                            primaryText = 'Добавить чат'
                            leftIcon = { <AddIcon /> }
                            onClick = { this.handleViewInputField }
                        />
                    </List>
                </div>
                <div className='chat__create' style={{display: this.state.isHidden ? 'block' : 'none'}}>
                    <TextField
                        hintText="Введите имя чата"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInput}
                        onKeyUp={this.handleKeyUp}
                        style={{width: '80%'}}
                    />
                    <FloatingActionButton mini={true} onClick={this.handleAddChat}>
                        <ContentAdd/>
                    </FloatingActionButton>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ chatsReducer }) => ({
    chatsList: chatsReducer.chatsList,
    isLoading: chatsReducer.isLoading,
    isLiteChat: chatsReducer.isLiteChat
});

const mapDispatchToProps = dispatch => bindActionCreators({ createChat, loadChats,  push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);