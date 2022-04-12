import React,{ useCallback,useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Colors from '../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Slider from 'rn-range-slider';
import { scaleWidth, scaleHeight } from '../utils/scaling';
import {DisplayContext} from '../context/DisplayContext'

export default RangeSlider = () => {
    const insets = useSafeAreaInsets()
    const renderThumb = useCallback(() => <View style={style.thumb} />, []);
    const renderRail = useCallback(() => <View style={style.rail} />, []);
    const renderRailSelected = useCallback(() => <View style={style.railSelected} />, []);
    const renderLabel = useCallback(value => (<View style={styles.label}>
        <Text style={styles.labelText}>{value}</Text>
      </View>), []);
    const renderNotch = useCallback(() => <View style={style.notch} />, []);
    const handleValueChange = useCallback((low, high) => {
    low;
    high;
    }, []);
    const displayContext = useContext(DisplayContext)
    const {darkMode} = displayContext
    const style = styles(insets,darkMode)
    
    return(
        <Slider
            style={style.slider}
            min={0}
            max={100}
            step={5}
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
            disableRange={true}
      />
    )
}

const styles = (insets,darkMode) => StyleSheet.create({
    slider: {
        width : '100%',
    },
    thumb: {
        width: scaleWidth * 30,
        height: scaleWidth * 30,
        borderWidth: 1,
        borderColor:darkMode ?Colors.primary.black: Colors.primary.white,
        backgroundColor:Colors.primary.lightGray,
        borderRadius: (scaleWidth * 30)/2,
        shadowOffset:{  width: 1,  height: 1,  },
        shadowColor:darkMode ?Colors.primary.inputBackground: Colors.primary.black,
        shadowOpacity: 0.5,
    },
    rail: {
        flex: 1,
        height: scaleHeight * 14,
        borderRadius: 20,
        backgroundColor: Colors.primary.secondGray,
    },
    railSelected: {
        height: scaleHeight * 14,
        backgroundColor:darkMode ?Colors.primary.darkInputBackground: Colors.primary.blue,
        borderRadius: 20,
    },
    notch: {
        width: 8,
        height: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor:darkMode ?Colors.primary.white: Colors.primary.black,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderTopWidth: 8,
    },
})