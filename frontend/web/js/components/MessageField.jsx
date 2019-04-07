import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import Message from './Message';
import { createMessage } from '../actions/chatsActions';
import '../../css/messages.sass';

class MessageField extends React.Component {

    static propTypes = {
        chatId: PropTypes.string,
        chatsList: PropTypes.object,
        createMessage: PropTypes.func.isRequired,
        isLoading: PropTypes.bool
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
    
    componentDidUpdate() {
        this.scrollToBottom();
    }

    handleSendMessage = () => {
        const data = {author: '2', text: this.state.message, chat: this.props.chatId};
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
        const messages = this.props.chatsList[this.props.chatId] ? this.props.chatsList[this.props.chatId].messages : [];
        let messageComponents = messages.map((message, index) =>
            <Message
                key={index}
                text={message.text}
                sender={message.author}
            />
        );

        if (this.props.isLoading) {
            return <div>Загрузка...</div>;
        }

        return (
            <div className='messages-block'>
                <div className="messages-block__container" style={{clear: 'both' }}>
                    <div className="messages-block__message-field">
                        { messageComponents }
                        <span className="scroll" ref={(el) => {this.messagesEnd = el;}}></span>
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

const mapStateToProps = ({ chatsReducer }) => ({
    chatsList: chatsReducer.chatsList,
    isLoading: chatsReducer.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators({ createMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);