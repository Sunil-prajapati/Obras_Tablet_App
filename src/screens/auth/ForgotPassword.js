import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Input from '../../components/Input';
import DisableBtn from '../../components/DisableBtn';
import { scaleWidth, scaleHeight, height } from '../../utils/scaling';
import Fonts from '../../constants/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DisplayContext } from '../../context/DisplayContext'
import { forgotPassword } from '../../utils/auth';

export default ForgotPassword = ({navigation}) => {
    const insets = useSafeAreaInsets()
    const displayContext = useContext(DisplayContext)
    const {darkMode} = displayContext
    const style = styles(insets, darkMode)
    const [email, setEmail] = useState(null)
    const [emailError, setEmailError] = useState(null)
    const [forgotDisabled, setForgotDisabled] = useState(true);

    useEffect(() => {
        email ? setForgotDisabled(false) : setForgotDisabled(true);
        setEmailError(null);
    }, [email]);

    const onSuccess = (msg) => {
        console.log(msg)
        navigation.navigate('SignIn')
    }

    const forgotPasswordClicked = () => {
        if(email !== null){
            forgotPassword(email,onSuccess,setEmailError)
        }
    }

    return (
        <SafeAreaView style={style.container}>
            <KeyboardAwareScrollView>
                <View style={style.sheetContainer}>
                    <Text style={style.heading}>Forgot Password</Text>
                    <View style={style.subContainer}>
                        <View style={style.inputContainer}>
                            <Input
                                placeHolder={'myEmail.com'}
                                inputHeading={'Email address'}
                                value={email}
                                onChange={(email) => {
                                    setEmail(email);
                                }}
                                error={emailError}
                            />
                        </View>
                        <TouchableOpacity
                            style={style.btnContainer}
                            onPress={() => forgotPasswordClicked()}
                            disabled={forgotDisabled}>
                            <DisableBtn
                                text={'submit'}
                                customStyle={{
                                    backgroundColor: forgotDisabled
                                        ? Colors.primary.lightGray
                                        : Colors.primary.blue,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = (insets, darkMode) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:darkMode ? Colors.primary.darkBg: Colors.primary.blue,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: scaleHeight * 150,
        },
        sheetContainer: {
            width: scaleWidth * 472,
            height: scaleHeight * 350,
            backgroundColor: darkMode ? Colors.primary.darkModalBackground : Colors.primary.white,
            borderRadius: 20,
            paddingHorizontal: scaleWidth * 70,
        },
        heading: {
            fontSize: scaleWidth * 24,
            alignSelf: 'center',
            marginTop: scaleHeight * 70,
            fontFamily: Fonts.primary.regular,
            color: darkMode ? Colors.primary.white : Colors.primary.headingTextColor,
        },
        inputContainer: {
            marginTop: scaleHeight * 15,
            flexDirection: 'row',
        },
        btnContainer: {
            marginTop: scaleHeight * 30,
        },
        subContainer: {
            marginTop: scaleHeight * 8,
        },
    });
