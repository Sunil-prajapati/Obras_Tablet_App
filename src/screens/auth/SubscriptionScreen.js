import React,{useContext} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';
import Colors from '../../constants/Colors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import ActiveBtn from '../../components/ActiveBtn';
import DisableBtn from '../../components/DisableBtn';
import Slider from '../../components/RangeSlider';
import Fonts from '../../constants/Fonts';
import { width, height, scaleHeight, scaleWidth } from '../../utils/scaling';
import {createUser} from '../../utils/auth'
import {DisplayContext} from '../../context/DisplayContext'

const featuresDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget felis eget nunc lobo mattis. Morbi tempus iaculis urna id volutpat. Eu ultrices vitae auctor eu.';
const termsDescription = 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.';

export default Subscribe = (props) => {
    const insets = useSafeAreaInsets()
    const {newUserDetails} = props.route.params
    const displayContext = useContext(DisplayContext)
    const {darkMode} = displayContext
    const style = styles(insets,darkMode)

    const onCreateUserSuccess = () => {
        console.log("user created successfully")
    }

    const signup = () => {
         createUser(newUserDetails,onCreateUserSuccess)
    }

    return (
        <SafeAreaView style={style.container} >
            <View style={style.sheetContainer}>
                <View style={style.contentContainer}>
                    <Text style={style.heading}>Pricing that lets you pay as you grow</Text>
                    <View style={style.sliderContainer}>
                        <Slider />
                        <Text style={style.sliderText}>Number of team members</Text>
                    </View>
                    <View style={style.subscribeContainer}>
                        <View style={style.leftSubscribeView}>
                            <View style={style.box}>
                                <Text style={style.prize}>$350
                                <Text style={style.monthOrYear}> per month</Text>
                                </Text>
                                <Text style={style.feature}>Features</Text>
                                <Text style={style.featureText}>
                                    {featuresDescription}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => signup()}>
                                <ActiveBtn text={"Subscribe"} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View style={style.box}>
                                <Text style={style.prize}>$350
                                <Text style={style.monthOrYear}> per month</Text>
                                </Text>
                                <Text style={style.feature}>Features</Text>
                                <Text style={style.featureText}>
                                    {featuresDescription}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => signup()}>
                                <DisableBtn text={"Subscribe"} customStyle={{backgroundColor:Colors.primary.lightGray}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={style.bottomContainer}>
                        <TouchableOpacity onPress={() => null} style={style.termCondition}>
                            <Text style={style.termsText}>{"Terms & Conditions"}</Text>
                        </TouchableOpacity>
                        <Text style={style.bottomText}> {termsDescription}</Text>
                    </View>

                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = (insets,darkMode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:darkMode ?Colors.primary.darkHeadingBackground: Colors.primary.blue,
    },
    sheetContainer: {
        width: width,
        height: height,
        backgroundColor:darkMode ?Colors.primary.darkBg: Colors.primary.white,
        marginTop: scaleHeight * 80,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    contentContainer: {
        height: height,
        paddingHorizontal: scaleWidth * 90,
    },
    heading: {
        fontSize: scaleHeight * 32,
        alignSelf: 'center',
        marginTop: scaleHeight * 50,
        fontFamily: Fonts.primary.regular,
        color:darkMode ?Colors.primary.white: Colors.primary.blue,
    },
    sliderContainer: {
        marginTop: 5,
    },
    sliderText: {
        fontSize: scaleHeight * 15,
        paddingTop: scaleHeight * 4,
        paddingLeft: scaleWidth * 5,
        color:darkMode ?Colors.primary.white: Colors.primary.lightGray,
        fontFamily: Fonts.primary.regular
    },
    box: {
        width: scaleWidth * 330,
        height: scaleHeight * 240,
        backgroundColor:darkMode ?Colors.primary.darkHeadingBackground: Colors.primary.inputBackground,
        borderRadius: 10,
        paddingHorizontal: scaleWidth * 20,
        marginBottom: scaleHeight * 16
    },
    prize: {
        fontSize: scaleHeight * 36,
        color:darkMode ?Colors.primary.darkInputHeading: Colors.primary.heading,
        fontFamily: Fonts.primary.bold,
        paddingTop: Platform.OS==='android' ? scaleHeight * 40 : scaleHeight * 20,
        margin: 0,
        borderWidth: 0,
    },
    monthOrYear: {
        fontSize: scaleHeight * 15,
        lineHeight: scaleHeight * 22,
        color: darkMode ?Colors.primary.inputBackground:Colors.primary.text,
        fontFamily: Fonts.primary.regular
    },
    feature: {
        fontSize: scaleHeight * 15,
        lineHeight: scaleHeight * 22,
        marginTop: scaleHeight * 5,
        color:darkMode ?Colors.primary.inputBackground: Colors.primary.text,
        fontFamily: Fonts.primary.bold
    },
    featureText: {
        fontSize: scaleHeight * 15,
        lineHeight: scaleHeight * 22,
        color:darkMode ?Colors.primary.inputBackground: Colors.primary.text,
        marginTop: "2%",
        fontFamily: Fonts.primary.regular
    },
    bottomContainer: {
        marginTop: scaleHeight * 40,
    },
    termCondition: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: scaleHeight * 8,
    },
    termsText: {
        fontSize: scaleHeight * 14,
        color:darkMode ?Colors.primary.lightGray: Colors.primary.darkGray,
        fontFamily: Fonts.primary.medium
    },
    bottomText: {
        fontSize: scaleHeight * 12,
        lineHeight: scaleHeight * 16,
        color:darkMode ?Colors.primary.lightGray: Colors.primary.darkGray,
        alignSelf: 'center',
        fontFamily: Fonts.primary.regular,
        textAlign: 'center'
    },
    subscribeContainer: { 
        flexDirection: 'row', 
        marginTop: scaleHeight * 30, 
        justifyContent: 'center', 
        paddingHorizontal: scaleWidth * 90, 
    },
    leftSubscribeView: { 
        marginRight: scaleWidth * 100 
    },
    
})