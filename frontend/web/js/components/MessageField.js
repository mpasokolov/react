import React from 'react';
import Message from './Message';

export default class MessageField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {text: 'Установка соединения', user: 'Admin'},
                {text: 'Связь установлена', user: 'Admin'},
            ],
        };
    }

    componentDidMount() {
        const newMessages = [...this.state.messages, {text: 'Пиши на здоровье', user: 'Admin'}];
        this.setState({ messages: newMessages });
    }

    componentDidUpdate(prevProps, prevState) {
        const oldMessage = prevState.messages[prevState.messages.length - 1];
        const newMessage = this.state.messages[this.state.messages.length - 1];

        if ((oldMessage.user === 'You' && newMessage.user === 'Admin') || (oldMessage.user === newMessage.user)) {
            return;
        }

        const newMessages = [...this.state.messages, {text: 'Спасибо за сообщение', user: 'Admin'}];
        setTimeout(() => this.setState({ messages: newMessages }), 100);
    }

    handleClick = () => {
        const newMessages = [...this.state.messages, {text: 'Формы все еще нет, мы просто напишем тут что-нибудь!', user: 'You'}];
        this.setState({ messages: newMessages });
    };

    render() {
        const messages = this.state.messages.map((message, index) =>
            <Message key={ index } text={ message.text } user={ message.user} />
        );

        return (
            <div>
                { messages }
                <button onClick={ this.handleClick }>Отправить сообщение</button>
            </div>
        );
    }
}