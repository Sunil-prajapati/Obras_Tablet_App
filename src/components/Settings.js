import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Dialog, { DialogContent, SlideAnimation } from 'react-native-popup-dialog';
import { scaleWidth, scaleHeight } from '../utils/scaling';
import Fonts from '../constants/Fonts';
import { useNavigation } from '@react-navigation/core';
import ToggleSwitch from 'toggle-switch-react-native';

export default Settings = ({ setVisible, callBack }) => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    const navigation = useNavigation();
    const [repeatEnabled, setRepeatEnabled] = useState(true);
    const [sendTeamNotificationEnabled, setSendTeamNotificationEnabled] = useState(false);

    const toggleSwitchRepeat = (status) => setRepeatEnabled(status);
    const toggleSwitchTeamNotification = (status) => setSendTeamNotificationEnabled(status);

    return (
        <Dialog
            visible={setVisible}
            onHardwareBackPress={() => callBack()}
            onTouchOutside={() => callBack()}
            dialogAnimation={new SlideAnimation({
                slideFrom: 'bottom',
            })}
        >
            <DialogContent style={style.dialogContent}>
                <View style={style.container}>
                    <View style={style.headerContainer}>
                        <TouchableOpacity onPress={() => callBack()}>
                            <Text style={style.textHeader}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={[style.textHeader, style.textSettings]}>Schedule Settings</Text>
                    </View>
                    <View style={style.bodyContainer}>
                        <View style={style.switchContainer}>
                            <ToggleSwitch
                                isOn={repeatEnabled}
                                onColor={Colors.primary.green}
                                offColor={Colors.primary.white}
                                size="small"
                                onToggle={(isOn) => toggleSwitchRepeat(isOn)}
                                trackOffStyle={style.trackOffStyle}
                            />
                        </View>
                        <Text style = {style.switchHintText}>Repeat current schedule daily</Text>
                        <View style={style.switchContainer}>
                            <ToggleSwitch
                                isOn={sendTeamNotificationEnabled}
                                onColor={Colors.primary.green}
                                offColor={Colors.primary.white}
                                size="small"
                                onToggle={(isOn) => toggleSwitchTeamNotification(isOn)}
                                trackOffStyle={style.trackOffStyle}
                            />
                        </View>
                        <Text style = {style.switchHintText}>Automatically send team notifications when new schedule is published. </Text>

                        <TouchableOpacity onPress={() => null}>
                            <View style={style.buttonView}>
                                <Text style={style.textSave}>Save</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </DialogContent>
        </Dialog>
    )
}

const styles = (insets) => StyleSheet.create({
    dialogContent: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0
    },
    container: {
        width: scaleWidth * 556,
        height: scaleHeight * 508,
        backgroundColor: Colors.primary.white,
    },
    headerContainer: {
        width: '100%',
        height: scaleHeight * 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scaleWidth * 20,
        backgroundColor: Colors.primary.blue,
    },
    textHeader: {
        fontSize: scaleWidth * 17,
        lineHeight: scaleWidth * 20,
        color: Colors.primary.white,
        fontFamily: Fonts.primary.semiBold
    },
    textSettings: {
        marginLeft: scaleWidth * 125
    },
    bodyContainer: {
        width: '100%',
        height: '100%',
        paddingHorizontal: scaleWidth * 24,
        paddingTop: scaleHeight * 21,
        backgroundColor: Colors.primary.inputBackground
    },
    trackOffStyle: {
        borderColor: '#f2f2f2',
        borderWidth: 1,
    },
    switchContainer: {
        width: scaleWidth * 508,
        height: scaleHeight * 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: scaleWidth * 20,
        backgroundColor: Colors.primary.white
    },
    buttonView: {
        width: scaleWidth * 329,
        height: scaleHeight * 45,
        marginTop: scaleHeight * 92,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        alignSelf: 'center',
        backgroundColor: Colors.primary.blue
    },
    textSave: {
        fontSize: scaleWidth * 15,
        lineHeight: scaleWidth * 21,
        color: Colors.primary.white,
        fontFamily: Fonts.primary.semiBold
    },
    switchHintText: {
        fontSize: scaleWidth * 13,
        lineHeight: scaleWidth * 16,
        marginTop: scaleHeight * 10,
        marginLeft: scaleWidth * 16,
        marginBottom: scaleHeight * 40,
        color: Colors.primary.switchHint,
        fontFamily: Fonts.primary.regular
    }
})