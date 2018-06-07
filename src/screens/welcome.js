import React from 'react'
import {Button, Text, View} from 'react-native'
import PropTypes from 'prop-types'


export default class WelcomeScreen extends React.PureComponent {
    static propTypes = {
        navigator: PropTypes.object.isRequired,
    }

    render() {
        const {navigator} = this.props
        return <View>
            <Text>Atom Code Annotations</Text>
            <Text>1. Scan the QR code.</Text>
            <Text>2. Take a photo.</Text>
            <Text>3. Confirm.</Text>
            <Text>4. Done.</Text>
            <Button
                onPress={() => {
                    navigator.push({
                        screen: 'AtomCodeAnnotations.ScanQrCodeScreen'
                    })
                }}
                title='OK'
             />
        </View>
    }
}
