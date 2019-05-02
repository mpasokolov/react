import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import Message from './Message';
import { createMessage, addMessage } from '../actions/chatsActions';
import '../../css/messages.sass';

class MessageField extends React.Component {

    static propTypes = {
        chatsList: PropTypes.object,
        chatId: PropTypes.number,
        defaultChat: PropTypes.number,
        createMessage: PropTypes.func.isRequired,
        addMessage: PropTypes.func.isRequired,
        isLoading: PropTypes.bool,
        emptyChatList: PropTypes.bool,
        user: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };

        this.socket = new WebSocket('ws://localhost:8080?chat=' + this.props.chatId);
        this.socket.onmessage = event => {
            this.handleNewMessage(JSON.parse(event.data));
        };

        window.addEventListener('beforeunload', () => {
            this.socket.onclose = function () {}; // disable onclose handler first
            this.socket.close();
        });
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    };
    
    componentDidUpdate() {
        this.scrollToBottom();
    }

    handleNewMessage = (message) => {
        this.props.addMessage(message);
    };

    handleSendMessage = () => {
        const data = {author: this.props.user.id ,author_login: this.props.user.login, text: this.state.message, chat: this.props.chatId};
        this.socket.send(JSON.stringify(data));
        this.props.createMessage(data);
        this.setState({message: ''});
    };

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleKeyUp = (evt) => {
        if (evt.keyCode === 13) { // Enter
            this.handleSendMessage();
        }
    };
    
    render() {
        let messageField;
        if (this.props.emptyChatList) {
            messageField = (
                <React.Fragment>
                    <div className="messages-block__message-field">
                        <div>Чаты не найдены. Создайте чат для начала общения!</div>
                        <span className="scroll" ref={(el) => {
                            this.messagesEnd = el;
                        }} />
                    </div>
                </React.Fragment>
            );
        } else {
            const chatId = this.props.chatId || this.props.defaultChat;
            const messages = this.props.chatsList[chatId] ? this.props.chatsList[chatId].messages : [];
            let messageComponents = messages.map((message, index) =>
                <Message
                    key={index}
                    text={message.text}
                    author_login={message.author_login}
                />
            );

            messageField = (
                <React.Fragment>
                    <div className="messages-block__container" style={{clear: 'both'}}>
                        <div className="messages-block__message-field">
                            {messageComponents}
                            <span className="scroll" ref={(el) => {
                                this.messagesEnd = el;
                            }} />
                        </div>
                    </div>
                    <div className='messages-block__input-field' style={{textAlign: 'center'}}>
                        <TextField
                            name="message"
                            hintText="Hint Text"
                            value={this.state.message}
                            onChange={this.handleInput}
                            onKeyUp={this.handleKeyUp}
                        />
                        <FloatingActionButton
                            mini={true}
                            style={{marginLeft: 20}}
                            onClick={this.handleSendMessage}>
                            <SendIcon/>
                        </FloatingActionButton>
                    </div>
                </React.Fragment>
            );
        }

        return (
            messageField
        );
    }
}

const mapStateToProps = ({ chatsReducer, usersReducer }) => ({
    defaultChat: chatsReducer.defaultChat,
    chatsList: chatsReducer.chatsList,
    emptyChatList: chatsReducer.emptyChatList,
    isLoading: chatsReducer.isLoading,
    user: usersReducer.user
});

const mapDispatchToProps = dispatch => bindActionCreators({ addMessage, createMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);