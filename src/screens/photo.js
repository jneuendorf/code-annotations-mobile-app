import React from 'react'
import {Button, Slider, Text, TextInput, View} from 'react-native'
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
        quality: initialQuality,
        desiredWidth: 1280,
    }
    camera = null

    constructor(props) {
        super(props)
        this.timer = setInterval(this.fetch, 2000)
    }

    render() {
        const {targetEditor, desiredWidth} = this.state
        if (!targetEditor) {
            return <View>
                <Text>Open a text file in Atom.</Text>
            </View>
        }
        return <KeyboardAwareScrollView
            style={{
                flex: 1,
            }}
        >
            <Text>The taken photo will be annotated to {targetEditor}</Text>
            <RNCamera
                ref={element => this.camera = element}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.auto}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
                style={{
                    width: 300,
                    height: 300,
                }}
            />
            <Slider
                value={initialQuality}
                onSlidingComplete={this.setQuality}
            />
            <TextInput
                keyboardType='numeric'
                value={`${desiredWidth}`}
                onChangeText={this.setDesiredWidth}
                maxLength={4}
            />
            <Button
                onPress={this.takeAndConfirmPhoto}
                title='Take photo'
            />
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
