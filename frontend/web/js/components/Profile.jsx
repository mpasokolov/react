import React from 'react';
import '../../css/profile.sass';
import {bindActionCreators} from 'redux';
import {firstNameEdit, lastNameEdit} from '../actions/usersActions';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionEdit from 'material-ui/svg-icons/action/build';
import ActionUpdate from 'material-ui/svg-icons/action/update';
import TextField from 'material-ui/TextField';

class Profile extends React.Component {

    static propTypes = {
        user: PropTypes.object,
        firstNameEdit: PropTypes.func.isRequired,
        lastNameEdit: PropTypes.func.isRequired,

    };

    styles = {
        smallIcon: {
            width: 15,
            height: 15,
        },
        small: {
            width: 36,
            height: 36,
            padding: 8,
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            firstName: {
                isEditable: false,
                text: ''
            },
            lastName: {
                isEditable: false,
                text: ''
            }
        };
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: {...this.state[e.target.name], text: e.target.value}});
    };

    changeViewMode = (e) => {
        const newState = {...this.state[e.currentTarget.name], isEditable: !this.state[e.currentTarget.name].isEditable};
        this.setState({[e.currentTarget.name]: newState});

        if (this.state[e.currentTarget.name].isEditable && this.state[e.currentTarget.name].text.length > 0) {
            this.props[e.currentTarget.name + 'Edit'](this.state[e.currentTarget.name].text);
        }
    };

    getEditableField = (name) => {
        return (
            <React.Fragment>
                <TextField
                    className='profile__text profile__text_modify'
                    name= {name}
                    value={this.state[name].text}
                    onChange={this.handleInput}
                    style={{height: '40px'}}
                />
                <IconButton
                    name={name}
                    tooltip="Save"
                    onClick={ this.changeViewMode }
                    iconStyle={this.styles.smallIcon}
                    style={this.styles.small}
                >
                    <ActionUpdate />
                </IconButton>
            </React.Fragment>
        );
    };

    getNotEditableField = (name) => {
        return (
            <React.Fragment>
                <p className='profile__text profile__text_view'> {this.props.user[name]} </p>
                <IconButton
                    name= {name}
                    onClick={ this.changeViewMode }
                    iconStyle={this.styles.smallIcon}
                    style={this.styles.small}
                >
                    <ActionEdit />
                </IconButton>
            </React.Fragment>
        );
    };

    render() {
        return (
            <React.Fragment>
                <div className='profile'>
                    <div className='profile__header'>Редактирование профиля</div>
                </div>
                <div className='profile__point'>
                    <h4 className='profile__caption'>Имя: </h4>
                    {
                        this.state.firstName.isEditable
                            ? this.getEditableField('firstName')
                            : this.getNotEditableField('firstName')
                    }
                </div>
                <div className='profile__point'>
                    <h4 className='profile__caption'>Фамилия: </h4>
                    {
                        this.state.lastName.isEditable
                            ? this.getEditableField('lastName')
                            : this.getNotEditableField('lastName')
                    }
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = ({ usersReducer }) => ({
    user: usersReducer.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({ firstNameEdit, lastNameEdit }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);