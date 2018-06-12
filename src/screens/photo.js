import React from 'react'
import {
    Button,
    Dimensions,
    Image,
    Slider,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import PropTypes from 'prop-types'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {RNCamera} from 'react-native-camera'


const initialQuality = 0.98


export default class PhotoScreen extends React.PureComponent {
    static propTypes = {
        navigator: PropTypes.object.isRequired,
    }

    state = {
        targetEditor: '',
        flashMode: 'off',
        quality: initialQuality,
        desiredWidth: 1280,
    }
    camera = null

    constructor(props) {
        super(props)
        this.timer = setInterval(this.fetch, 2000)
    }

    render() {
        const {targetEditor, flashMode, desiredWidth} = this.state
        if (!targetEditor) {
            return <View>
                <Text>Open a text file in Atom.</Text>
            </View>
        }
        const screenWidth = Dimensions.get('window').width
        return <KeyboardAwareScrollView style={styles.container}>
            <View style={styles.section}>
                <Text>
                    Annotating <Text style={styles.bold}>{targetEditor}</Text>
                </Text>
            </View>
            <RNCamera
                ref={element => this.camera = element}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode[flashMode]}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
                // style={styles.camera}
                style={{
                    height: screenWidth,
                    width: screenWidth,
                }}
            />
            <View style={[
                styles.section,
                {
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                },
            ]}>
                {['auto', 'on', 'off'].map(mode => {
                    return <TouchableOpacity
                        key={mode}
                        onPress={() => this.setFlashMode(mode)}
                    >
                        <Image
                            source={global.icons[
                                `flash-${mode}`
                                + (
                                    flashMode === mode
                                    ? '--active'
                                    : ''
                                )
                            ]}
                            style={styles.flashIcon}
                        />
                    </TouchableOpacity>
                })}
            </View>
            <View style={styles.section}>
                <Button
                    onPress={this.takeAndConfirmPhoto}
                    title='Take photo'
                />
            </View>
            <View style={styles.section}>
                <Text>Quality</Text>
                <Slider
                    value={initialQuality}
                    onSlidingComplete={this.setQuality}
                />
            </View>
            <View style={[styles.section, {flexDirection: 'row'}]}>
                <Text style={{marginRight: 15}}>Width</Text>
                <TextInput
                    keyboardType='numeric'
                    value={`${desiredWidth}`}
                    onChangeText={this.setDesiredWidth}
                    maxLength={4}
                />
            </View>
            {/* <View style={styles.spacer} /> */}
        </KeyboardAwareScrollView>
    }

    fetch = async () => {
        const {url} = this.props
        console.log('fetch from', url)
        const response = await fetch(url, {
            method: 'get',
        })
        const targetEditor = await response.text()
        console.log('>>>>> targetEditor:', targetEditor)
        this.setState({targetEditor})
    }

    setFlashMode = mode => {
        this.setState({flashMode: mode})
    }

    setQuality = value => {
        this.setState({quality: value})
    }

    setDesiredWidth = value => {
        this.setState({desiredWidth: parseInt(value, 10)})
    }

    takeAndConfirmPhoto = async () => {
        const {navigator, url} = this.props
        const {quality, desiredWidth} = this.state
        const {base64, uri, width, height} = await this.camera.takePictureAsync({
            quality,
            width: desiredWidth,
            base64: true,
        })
        const dataUrl = `data:image/jpeg;base64,${base64}`
        navigator.push({
            screen: 'AtomCodeAnnotations.ConfirmScreen',
            title: 'Confirm',
            passProps: {
                image: {
                    dataUrl,
                    uri,
                    width,
                    height,
                },
                server: {url},
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        padding: 20,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    bold: {
        fontWeight: 'bold',
    },
    flashIcon: {
        height: 25,
        width: 25,
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
