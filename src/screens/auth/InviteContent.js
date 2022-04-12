import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform
} from "react-native";
import Colors from '../../constants/Colors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import TitleInput from '../../components/TitleInput';
import DisableBtn from '../../components/DisableBtn';
import OvalBtn from '../../components/OvalBtn';
import Input from '../../components/Input';
import { scaleWidth, scaleHeight } from '../../utils/scaling';
import Fonts from '../../constants/Fonts';

const type = [
    {
        text: "Admin",
    },
    {
        text: "Moderator",
    },
    {
        text: "Team member",
    },
]

const inputFields = [
    {
        placeholder: "0000000",
        heading: "Employee ID"
    },
    {
        placeholder: "myemail@somewhere.com",
        heading: "Email address"
    },
    {
        placeholder: "First name",
        heading: "First name"
    },
    {
        placeholder: "Last name",
        heading: "Last name"
    },
    {
        placeholder: "Preferred name",
        heading: "Preferred name"
    },
]

const permission = [
    {
        name: "All projects",
    },
    {
        name: "Assigned projects",
    },
]

export default InviteContent = ({ navigation }) => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)

    const doneClicked = () => {
        navigation.goBack(null);
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.sheetContainer}>
                <ScrollView
                    style={{
                        flex: 1,
                        backgroundColor: Colors.primary.white,
                        borderRadius: 20,
                        paddingTop: scaleHeight * 20,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={style.contentContainer}>
                        <TitleInput />
                        <Text style={style.type}>Type</Text>
                        <View style={style.ovalBtnContainer}>
                            {type.map((name, index) => {
                                return (
                                    <View key={index}>
                                        <OvalBtn text={name.text} />
                                    </View>
                                )
                            })}
                        </View>
                        {inputFields.map((fieldsData, index) => {
                            return (
                                <View style={style.inputContainer} key={index}>
                                    <Input placeHolder={fieldsData.placeholder} inputHeading={fieldsData.heading} />
                                </View>
                            );
                        })}
                        <View style={style.permissionPart}>
                            <Text style={style.type}>Project permissions</Text>
                            <View style={style.ovalBtnContainer}>
                                {permission.map((name, index) => {
                                    return (
                                        <View key={index}>
                                            <OvalBtn text={name.name} />
                                        </View>
                                    )
                                })}
                            </View>
                            <TouchableOpacity style={style.doneBtn} onPress={() => doneClicked()}>
                                <DisableBtn text={"Done"} customStyle={{backgroundColor:Colors.primary.lightGray}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
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
        height: scaleHeight * 750,
        backgroundColor: Colors.primary.white,
        borderRadius: 20,
    },
    contentContainer: {
        flex: 1,
        paddingLeft: scaleWidth * 70,
    },
    type: {
        fontSize: scaleHeight * 13,
        textTransform: 'uppercase',
        marginTop: scaleHeight * 15,
        letterSpacing: 0.5,
        color: Colors.primary.subHeading,
        fontFamily: Fonts.primary.regular,
        marginBottom: Platform.OS==='android' ? 0 : scaleHeight * 8,
    },
    ovalBtnContainer: {
        flexDirection: 'row',
        marginTop: scaleHeight * 2
    },
    inputContainer: {
        marginTop: scaleHeight * 20,
    },
    permissionPart: {
        marginBottom: scaleHeight * 10
    },
    doneBtn: {
        marginVertical: scaleHeight * 25,
    }
})