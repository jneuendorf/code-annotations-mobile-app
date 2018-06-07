import React from 'react'
import PropTypes from 'prop-types'

import QrCodeScanner from 'react-native-qrcode-scanner'


export default class WelcomeScreen extends React.PureComponent {
    static propTypes = {
        navigator: PropTypes.object.isRequired,
    }

    render() {
        return <QrCodeScanner
            onRead={this.onRead}
        />
    }

    onRead = event => {
        const {navigator} = this.props
        console.log(event)
        navigator.push({
            screen: 'AtomCodeAnnotations.AddAnnotationScreen',
            passProps: {
                url: event.data,
            },
        })
    }
}
