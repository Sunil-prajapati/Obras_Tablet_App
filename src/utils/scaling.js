import {Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window');
//Use Tablet as base size wich is 1080 * 810

const baseWidth = 1080;
const baseHeight = 810;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;

const scale = Math.min(scaleWidth, scaleHeight);

export {scale, width, height, scaleWidth, scaleHeight}