import React from 'react';
import '../../css/messages.sass';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';

class Message extends React.Component {

    static propTypes = {
        sender: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        user: PropTypes.object
    };

    render() {
        return (
            <div className={ this.props.sender === 'bot' ? 'message message_bot' : 'message message_my' }>
                <div className={this.props.sender === 'bot' ? 'message__name message__name_bot' : 'message__name message__name_my'}>
                    { this.props.sender === 'bot' ? 'bot' : this.props.user.firstName }
                </div>
                <div className='message__text'>{ this.props.text }</div>
            </div>
        );
    }
}

const mapStateToProps = ({ usersReducer }) => ({
    user: usersReducer.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Message);