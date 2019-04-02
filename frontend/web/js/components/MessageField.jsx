import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import Message from './Message';
import { sendMessage, replyMessage, initStore } from '../actions/messageActions';
import '../../css/messages.sass';

class MessageField extends React.Component {

    static propTypes = {
        chatId: PropTypes.string,
        messages: PropTypes.object,
        sendMessage: PropTypes.func.isRequired,
        replyMessage: PropTypes.func.isRequired,
        initStore: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };
    }
    
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    };
    
    componentDidUpdate(prevProps) {
        const { messages, chatId } = this.props;
        const chatMessages = messages[chatId];
        if (chatMessages) {
            const lastMessageSender = chatMessages && chatMessages[chatMessages.length - 1] ?
                chatMessages[chatMessages.length - 1].sender :
                '';
            if (!prevProps.messages[chatId]) {
                setTimeout(this.handleReply, 100);
            } else if (prevProps.messages[chatId].length < chatMessages.length  && lastMessageSender === 'me') {
                setTimeout(this.handleReply, 100);
            }
        }
        this.scrollToBottom();
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    handleSendMessage = () => {
        this.props.sendMessage(this.props.chatId, this.state.message);
        this.setState({message: ''});
    };

    handleReply = () => {
        this.props.replyMessage(this.props.chatId);
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
        let messageComponents = [];
        if (this.props.messages.hasOwnProperty(this.props.chatId)) {
            messageComponents = this.props.messages[this.props.chatId].map((message, index) =>
                <Message
                    key={index}
                    text={message.text}
                    sender={message.sender}
                />
            );
        }

        return (
            <div className='messages-block'>
                <div className="messages-block__container" style={{clear: 'both' }}>
                    <div className="messages-block__message-field">
                        { messageComponents }
                        <div className="scroll" ref={(el) => {this.messagesEnd = el;}}></div>
                    </div>
                </div>
                <div className='messages-block__input-field' style={{ textAlign: 'center' }}>
                    <TextField
                        name = "message"
                        hintText = "Hint Text"
                        value = { this.state.message }
                        onChange = { this.handleInput }
                        onKeyUp = { this.handleKeyUp }
                    />
                    <FloatingActionButton
                        mini={ true }
                        style={{ marginLeft: 20 }}
                        onClick={ this.handleSendMessage }>
                        <SendIcon />
                    </FloatingActionButton>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ messageReducer }) => ({
    messages: messageReducer.messages,
});

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage, replyMessage, initStore }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);