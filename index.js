import {Navigation} from 'react-native-navigation'

import WelcomeScreen from './src/screens/welcome'
import ScanQrCodeScreen from './src/screens/scan-qr-code'
import AddAnnotationScreen from './src/screens/add-annotation'


Navigation.registerComponent(
    'AtomCodeAnnotations.WelcomeScreen',
    () => WelcomeScreen
)
Navigation.registerComponent(
    'AtomCodeAnnotations.ScanQrCodeScreen',
    () => ScanQrCodeScreen
)
Navigation.registerComponent(
    'AtomCodeAnnotations.AddAnnotationScreen',
    () => AddAnnotationScreen
)

Navigation.startSingleScreenApp({
    screen: {
        title: 'Welcome',
        screen: 'AtomCodeAnnotations.WelcomeScreen',
    },
})
