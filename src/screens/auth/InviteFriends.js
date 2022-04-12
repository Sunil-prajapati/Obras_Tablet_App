import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import Colors from '../../constants/Colors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import ArrowInput from '../../components/ArrowInput';
import DisableBtn from '../../components/DisableBtn';
import { scaleWidth, scaleHeight } from '../../utils/scaling';
import Fonts from '../../constants/Fonts';
import { AuthContext } from '../../context/AuthContext';

export default InviteFriends = ({ navigation }) => {
    const authContext = useContext(AuthContext)
    const { currentAuth, setCurrentAuth } = authContext;
    const insets = useSafeAreaInsets()
    const style = styles(insets)

    const skipClicked = () =>{
        navigateToHome();
    }
    const inviteClicked = () =>{
        navigateToHome();
    }

    const navigateToHome = () =>{
        setCurrentAuth("login");
        if(currentAuth !== null){
            navigation.navigate('Projects')
        }
    }

    return (
        <SafeAreaView style={style.container} >
            <View style={style.sheetContainer}>
                <View style={style.contentContainer}>
                    <Text style={style.heading}>Invite Team Members</Text>
                    <TouchableOpacity
                        style={style.InputTextContainer}
                        onPress={() => navigation.navigate('InviteContent')}
                    >
                        <ArrowInput />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={style.InputTextContainer}
                        onPress={() => navigation.navigate('InviteContent')}
                    >
                        <ArrowInput />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={style.InputTextContainer}
                        onPress={() => navigation.navigate('InviteContent')}
                    >
                        <ArrowInput />
                    </TouchableOpacity>
                    <View style={style.addTeamContainer}>
                        <View style={style.iconContainer}>
                            <Text style={style.plusIcon}>+</Text>
                        </View>
                        <View style={style.textContainer}>
                            <Text style={style.textAdd}>Add team member</Text>
                        </View>
                    </View>
                    <View style={style.lineContainer}>
                        <Text style={style.line}>You can also import using: CSV and XLS file</Text>
                    </View>
                    <View style={style.buttonsContainer}>
                        <TouchableOpacity onPress={() => inviteClicked()}>
                            <DisableBtn text={"Invite"} customStyle={{backgroundColor:Colors.primary.lightGray}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => skipClicked()} style={style.skipBtnContainer}>
                            <Text style={style.skipBtn}>
                                Skip
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = (insets) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary.blue,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sheetContainer: {
        width: scaleWidth * 472,
        height: scaleHeight * 599,
        backgroundColor: Colors.primary.white,
        borderRadius: 20,
    },
    contentContainer: {
        flex: 1,
        paddingLeft: scaleWidth * 20,
        alignItems: 'center'
    },
    heading: {
        fontSize: scaleHeight * 24,
        lineHeight: scaleHeight * 28,
        alignSelf: 'center',
        marginTop: scaleHeight * 50,
        marginBottom: scaleHeight * 35,
        textAlign: 'center',
        color: Colors.primary.headingTextColor,
        fontFamily: Fonts.primary.regular,
    },
    InputTextContainer: {
        marginTop: scaleHeight * 10
    },
    addTeamContainer: {
        width: scaleWidth * 452,
        flexDirection: 'row',
        marginTop: scaleHeight * 14,
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: Colors.primary.blue,
        width: scaleWidth * 25,
        height: scaleWidth * 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: (scaleWidth * 25) / 2
    },
    plusIcon: {
        fontSize: scaleHeight * 18,
        color: Colors.primary.white,
        includeFontPadding: false,
    },
    textContainer: {
        justifyContent: 'center',
    },
    textAdd: {
        paddingHorizontal: scaleHeight * 10,
        fontSize: scaleHeight * 15,
        lineHeight: scaleHeight * 22,
        color: Colors.primary.blue,
        letterSpacing: 0.5,
        fontFamily: Fonts.primary.regular,
    },
    lineContainer: {
        paddingHorizontal: scaleWidth * 70,
        marginTop: scaleHeight * 65,
    },
    line: {
        fontSize: scaleHeight * 15,
        lineHeight: scaleHeight * 22,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.primary.headingTextColor,
        color: Colors.primary.headingTextColor,
        fontFamily: Fonts.primary.regular,
    },
    buttonsContainer: {
        marginTop: scaleHeight * 40,
    },
    skipBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scaleHeight * 20,
    },
    skipBtn: {
        fontSize: scaleHeight * 15,
        lineHeight: scaleHeight * 22,
        color: Colors.primary.heading,
    }
})

