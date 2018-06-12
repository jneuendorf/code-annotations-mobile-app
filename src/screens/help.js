import React from 'react'
import {
    Linking,
    Button,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import PropTypes from 'prop-types'


export default class WelcomeScreen extends React.PureComponent {
    static propTypes = {
        navigator: PropTypes.object.isRequired
    }

    get sections() {
        return {
            'Step 1 - Scan the QR code': (
                `The QR code can be displayed in Atom by activating the
                'Show QR Code' command from the command palette.
                The code tells this app where photo annotations must be sent.`
            ),
            'Step 2 - Take a photo': (
                `That photo will be sent to Atom as code annotation.
                You can adjust the size and quality of the photo (JPEG).
                Smaller photo sizes result in faster transfer times to and
                faster annotation rendering in Atom.`
            ),
            'Step 3 - Confirm the photo': (
                `The taken photo is displayed so you can confirm you want to use it.
                If necessary, you can go back and take a better photo.`
            ),
        }
    }

    render() {
        const {navigator} = this.props
        const {sections} = this
        return <ScrollView>
            <View style={[
                styles.section,
                {
                    borderBottomColor: '#bbb',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }
            ]}>
                <Text style={styles.text}>
                    This app is meant to be used together with the
                    <Text
                        style={styles.link}
                        onPress={() =>
                            Linking.openURL('http://atom.io/packages/code-annotations')
                        }
                    > code-annotations </Text>
                    Atom package.
                </Text>
            </View>
            {Object.entries(sections).map(([headline, text]) => {
                return <View key={headline} style={styles.section}>
                    <Text style={styles.headline}>
                        {headline}
                    </Text>
                    <Text style={styles.text}>
                        {text.replace(/\s+/g, ' ')}
                    </Text>
                </View>
            })}
            <Button
                onPress={() => navigator.pop()}
                title='Got it'
            />
            <View style={styles.spacer} />
        </ScrollView>
    }
}

const styles = StyleSheet.create({
    section: {
        flex: 1,
        padding: 20,
    },
    headline: {
        fontSize: 20,
        marginBottom: 14,
    },
    text: {
        fontSize: 16,
        textAlign: 'justify',
    },
    link: {
        color: 'rgb(0,122,255)',
    },
    spacer: {
        height: 10,
        width: 10,
    },
})
