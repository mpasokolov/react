import React from 'react';
import Close from 'material-ui/svg-icons/navigation/close';
import '../../css/popup.sass';



class InstallPopup extends React.Component {
    state = {
        isShown: false,
    };

    componentDidMount() {
        // Detects if device is on iOS
        const isIos = () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            return /iphone|ipad|ipod/.test( userAgent );
        };
        // Detects if device is in standalone mode
        const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

        // Checks if should display install popup notification:
        if (isIos() && !isInStandaloneMode()) {
            this.handleShow();
        }
    }

    handleShow = () => {
        this.setState({ isShown: true });
    };

    handleHide = () => {
        this.setState({ isShown: false });
    };

    render() {
        return (
            <div style={ { display: this.state.isShown ? 'block' : 'none' } } className="speech-bubble-container">
                <div className="speech-bubble">
                    <Close className="close-install-message-icon" onClick={ this.handleHide } />
                    <div style={ { paddingRight: '15px' } }>Установи приложение на свой iPhone: нажми поделиться, а затем На экран "Домой"</div>
                </div>
            </div>
        );
    }
}

export default InstallPopup;