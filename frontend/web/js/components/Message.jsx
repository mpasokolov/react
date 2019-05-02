import React from 'react';
import '../../css/messages.sass';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';

class Message extends React.Component {

    static propTypes = {
        author_login: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        user: PropTypes.string
    };

    render() {
        console.log(this.props.author_login);
        console.log(this.props.user);
        return (
            <div className = {
                this.props.author_login !==  this.props.user.login
                    ? 'message message_bot'
                    : 'message message_my'
            }>
                <div className = {
                    this.props.author_login !==  this.props.user.login
                        ? 'message__name message__name_bot'
                        : 'message__name message__name_my'
                }>
                    {
                        // this.props.author_login === this.props.user.login
                        //     ? this.props.user.login
                        //     :
                        this.props.author_login
                    }
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