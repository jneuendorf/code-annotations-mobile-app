/* See https://git.io/vh8vB
 * recommended by https://wix.github.io/react-native-navigation/#/third-party-libraries-support?id=react-native-vector-icons
 *
 * Define all your icons once, load them once, and use everywhere.
*/
import Ionicons from 'react-native-vector-icons/Ionicons'

// define your suffixes by yourself..
// here we use active, big, small, very-big..
const replaceSuffixPattern = /--(active|big|small|very-big)/g
const icons = {
    'ios-help-circle-outline': [30, '#00f'],
}

let iconsMap = null
const loadIcons = async (defaultIconProvider=Ionicons) => {
    if (!iconsMap) {
        const keys = Object.keys(icons)
        const sources = await Promise.all(keys.map(iconName => {
            const [
                size,
                color,
                provider=defaultIconProvider,
            ] = icons[iconName]
            return provider.getImageSource(
                iconName.replace(replaceSuffixPattern, ''),
                size,
                color,
            )
        }))
        iconsMap = {}
        for (const [idx, iconName] of Object.entries(keys)) {
            iconsMap[iconName] = sources[idx]
        }
    }
    return iconsMap
}

export {loadIcons}
export default loadIcons
