import React, {useEffect, useState, useCallback, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../constants/Colors';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Fonts from '../../constants/Fonts';
import {scaleWidth, scaleHeight, width} from '../../utils/scaling';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  GiftedChat,
  Send,
  InputToolbar,
  Actions,
  Composer,
  Bubble,
  Avatar,
  Day,
  Time,
} from 'react-native-gifted-chat';
import {UserContext} from '../../context/UserContext';
import profileDemo from '../../assets/images/profile/user.png';
import {AuthContext} from '../../context/AuthContext';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadMessageImages, getMessagePicture} from '../../utils/api';
import uuid from 'react-native-uuid';
import ImageResizer from 'react-native-image-resizer';
import {DisplayContext} from '../../context/DisplayContext';
import {useRoute} from '@react-navigation/native';

export default Messages = (props) => {
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState([]);
  const userContext = useContext(UserContext);
  const {users, count, setCount} = userContext;
  const authContext = useContext(AuthContext);
  const {currentAuth} = authContext;
  const [selectedChat, setSelectedChat] = useState(
    props.route.params.query === null ? users[0] : props.route.params.query,
  );
  const [imageLoading, setImageLoading] = useState(false);
  const [messageImage, setMessageImage] = useState(null);
  const MenuBurger = require('../../assets/icons/MenuBurger.png');
  const PlusImg = require('../../assets/icons/plus.png');
  const RightArrow = require('../../assets/icons/Disclosure_Indicators.png');
  const NoMessage = require('../../assets/icons/no_message.png');
  const Attachment = require('../../assets/icons/attachment.png');
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, darkMode);

  const toggleDrawer = () => {
    props.navigation.toggleDrawer();
  };
  const onItemClick = (item) => {
    setCount(false);
    setSelectedChat(item);
  };

  const renderMessageListItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onItemClick(item)}
        disabled={imageLoading}>
        <View style={style.chatListContainer}>
          <Image
            style={[style.avatarImage, {borderColor: item.professionColor}]}
            source={profileDemo}
          />
          <View style={style.nameContainer}>
            <View style={style.nameTimeView}>
              <Text style={style.name}>{item.name}</Text>
              <Text style={style.time}>
                {item.userId === messages[0]?.receiverId
                  ? moment(messages[0].createdAt).format('h:mm a')
                  : null}
              </Text>
            </View>
            {item.userId === messages[0]?.receiverId ? (
              messages[0].text !== '' ? (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={style.message}>
                  {item.userId === messages[0]?.receiverId
                    ? messages[0].text
                    : null}
                </Text>
              ) : (
                <Image source={Attachment} />
              )
            ) : null}
          </View>
          <Image style={style.rightArrow} source={RightArrow} />
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (count === true) {
      setSelectedChat(props.route.params.query);
    }
    var subscription = firestore()
      .collection('chat')
      .doc(currentAuth.uid + '-' + selectedChat?.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          if (querySnapshot._docs) {
            let fetchedTexts = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              if (data.createdAt) {
                let text = {
                  _id: data._id,
                  text: data.text,
                  createdAt: data.createdAt.toDate(),
                  user: data.user,
                  receiverId: data.receiverId,
                  image: data.image,
                };
                fetchedTexts.push(text);
              } else {
                let text = {
                  _id: data._id,
                  text: data.text,
                  createdAt: new Date(),
                  user: data.user,
                };
                fetchedTexts.push(text);
              }
            });
            setMessages(fetchedTexts);
          } else {
            setMessages([]);
          }
        },
        (error) => {
          console.log('error listening for message changes', error);
        },
      );

    return () => subscription();
  }, [selectedChat?.userId, props.route.params.query]);

  function setError() {
    alert('message not sent');
  }

  const options = {
    title: 'Select Image',
    noData: true,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const openPicker = () => {
    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setMessageImage(response.assets[0].uri);
        let newWidth = 200;
        let newHeight = 200;
        let compressFormat = 'JPEG';
        let quality = 600;
        let rotation = 0;
        let outputPath = null;
        let imageUri = response.assets[0].uri;
        ImageResizer.createResizedImage(
          imageUri,
          newWidth,
          newHeight,
          compressFormat,
          quality,
          rotation,
          outputPath,
        )
          .then((resizeResponse) => {
            let uri = resizeResponse.uri;
            let uploadUri =
              Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
            let user = {};
            user['_id'] = currentAuth.uid;
            let imageMessage = {
              _id: uuid.v4(),
              createdAt: new Date(),
              senderId: currentAuth.uid,
              receiverId: selectedChat?.userId,
              text: '',
              image: uploadUri,
              messageType: 'image',
              user: user,
            };
            setMessages((previousMessages) =>
              GiftedChat.append(previousMessages, imageMessage),
            );
            setImageLoading(true);
            uploadMessageImages(
              uploadUri,
              response.assets[0].fileName,
              selectedChat?.userId,
              setError,
              onSuccess,
            );
            function onSuccess(imgName) {
              getMessagePicture(imgName, selectedChat.userId, fetchSuccess);
              function fetchSuccess(url) {
                firestore()
                  .collection('chat')
                  .doc(currentAuth.uid + '-' + selectedChat.userId)
                  .collection('messages')
                  .add({
                    ...imageMessage,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                  });
                setImageLoading(false);
              }
            }
          })
          .catch((err) => {
            console.log('image resizing error => ', err);
            setImageLoading(false);
          });
      }
    });
  };

  const onSend = useCallback(
    (messages = []) => {
      const messageArray = messages[0];
      const customMessage = {
        ...messageArray,
        senderId: currentAuth.uid,
        receiverId: selectedChat?.userId,
        image: '',
        createdAt: new Date(),
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, customMessage),
      );
      firestore()
        .collection('chat')
        .doc(currentAuth.uid + '-' + selectedChat?.userId)
        .collection('messages')
        .add({
          ...customMessage,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
    },
    [selectedChat?.userId],
  );

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={style.inputToolbar}
      primaryStyle={{alignItems: 'center'}}
    />
  );

  const renderActions = (props) => (
    <Actions
      {...props}
      containerStyle={style.actionContainer}
      icon={() => <Image style={style.attachment} source={Attachment} />}
      options={{
        'Choose From Library': () => {
          openPicker();
        },
        Cancel: () => {
          console.log('Cancel');
        },
      }}
      optionTintColor="#222B45"
    />
  );

  const renderComposer = (props) => (
    <Composer {...props} textInputStyle={style.textInputMessage}>
      <TextInput style={style.textInputMessage}></TextInput>
    </Composer>
  );

  const renderChatEmpty = () => {
    return (
      <View style={style.viewNoMessage}>
        <Image style={style.imageNoMessage} source={NoMessage} />
        <Text style={style.textNoMessage}>No messages</Text>
      </View>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: style.bubbleWrapperLeft,
          right: style.bubbleWrapperRight,
        }}
        textStyle={{
          left: style.bubbleTextLeft,
          right: style.bubbleTextRight,
        }}
      />
    );
  };

  const renderAvatar = (props) => (
    <Avatar
      {...props}
      containerStyle={{
        left: style.avatarContainerLeft,
        right: style.avatarContainerRight,
      }}
      imageStyle={{
        left: style.avatarLeft,
        right: style.avatarRight,
      }}
    />
  );

  const renderDay = (props) => {
    return <Day {...props} textStyle={style.textChatDay} />;
  };

  const renderTime = (props) => {
    return (
      <Time
        {...props}
        textStyle={{
          left: style.timeLeft,
          right: style.timeRight,
        }}
      />
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.containerLeft}>
        <View style={style.headerContainerLeft}>
          <TouchableOpacity
            style={style.menuBurger}
            onPress={() => toggleDrawer()}>
            <Image source={MenuBurger} />
          </TouchableOpacity>
          <View style={style.headerRow}>
            <Text style={style.textChats}>Chats</Text>
            <View style={style.viewPlusButton}>
              <TouchableOpacity style={style.plusIcon} onPress={() => null}>
                <Image style={style.icons} source={PlusImg} />
              </TouchableOpacity>
            </View>
          </View>
          <TextInput style={style.searchBox} placeholder={'Search'}></TextInput>
        </View>
        <FlatList
          data={users}
          renderItem={renderMessageListItem}
          keyExtractor={(item, id) => id.toString()}
          style={{borderRightWidth: 0.4, borderRightColor: Colors.primary.line}}
        />
      </View>

      <View style={style.containerRight}>
        <View style={style.headerContainerRight}>
          <View style={{alignItems: 'center'}}>
            <Image style={style.imageHeaderUser} source={profileDemo} />
            <Text style={style.textHeader}>{selectedChat?.name}</Text>
          </View>
        </View>
        {imageLoading === true ? (
          <View style={{position: 'relative', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#000000" />
          </View>
        ) : null}
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: currentAuth.uid,
            avatar: profileDemo,
          }}
          renderComposer={renderComposer}
          renderActions={renderActions}
          renderInputToolbar={renderInputToolbar}
          renderChatEmpty={messages.length < 1 ? renderChatEmpty : null}
          messagesContainerStyle={{
            transform: [{scaleY: messages.length === 0 ? -1 : 1}],
          }}
          alwaysShowSend={false}
          renderBubble={renderBubble}
          showUserAvatar={true}
          showAvatarForEveryMessage={false}
          renderAvatar={renderAvatar}
          renderDay={renderDay}
          renderTime={renderTime}
          listViewProps={{contentContainerStyle: {padding: scaleWidth * 10}}}
          renderLoading={() => (
            <ActivityIndicator size="large" color="#000000" />
          )}
          useNativeDriver={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = (insets, darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: Colors.primary.white,
    },
    containerLeft: {
      width: scaleWidth * 320,
      height: '100%',
      backgroundColor: darkMode
        ? Colors.primary.calenderButtonTextColor
        : Colors.primary.white,
      flexDirection: 'column',
    },
    containerRight: {
      width: scaleWidth * 760,
      height: '100%',
      backgroundColor: darkMode
        ? Colors.primary.calenderButtonTextColor
        : Colors.primary.inputBackground,
      flexDirection: 'column',
    },
    headerContainerLeft: {
      width: scaleWidth * 320,
      height: scaleHeight * 150,
      flexDirection: 'column',
      paddingLeft: scaleWidth * 20,
      backgroundColor: darkMode
        ? Colors.primary.calenderButtonTextColor
        : Colors.primary.blue,
    },
    headerContainerRight: {
      width: scaleWidth * 760,
      height: scaleHeight * 86,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 0.4,
      backgroundColor: darkMode
        ? Colors.primary.calenderButtonTextColor
        : Colors.primary.blue,
    },
    menuBurger: {
      width: scaleWidth * 70,
      height: scaleHeight * 40,
      marginTop: scaleHeight * 20,
      justifyContent: 'center',
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    viewPlusButton: {
      flex: 1,
      justifyContent: 'flex-end',
      flexDirection: 'row',
    },
    textChats: {
      fontSize: scaleWidth * 28,
      lineHeight: scaleHeight * 32,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.bold,
    },
    plusIcon: {
      marginRight: scaleWidth * 15,
    },
    icons: {
      width: scaleWidth * 35,
      height: scaleWidth * 35,
    },
    searchBox: {
      width: scaleWidth * 288,
      height: scaleHeight * 37,
      marginTop: Platform.OS == 'ios' ? scaleHeight * 10 : scaleHeight * 5,
      marginRight: scaleWidth * 15,
      borderRadius: 20,
      padding: 2,
      paddingLeft: scaleWidth * 16,
      margin: 0,
      borderWidth: 0,
      color: darkMode ? Colors.primary.white : Colors.primary.headingTextColor,
      backgroundColor: darkMode ? Colors.primary.darkInputBackground : 'white',
      fontSize: scaleWidth * 15,
      fontFamily: Fonts.primary.regular,
    },
    chatListContainer: {
      height: scaleHeight * 75,
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.white,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: scaleWidth * 15,
      borderBottomColor: Colors.primary.secondGray,
      borderBottomWidth: 0.5,
    },
    nameTimeView: {
      width: scaleWidth * 216,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    name: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      fontFamily: Fonts.primary.semiBold,
      color: darkMode ? Colors.primary.white : Colors.primary.heading,
    },
    time: {
      fontSize: scaleWidth * 12,
      lineHeight: scaleWidth * 22,
      fontFamily: Fonts.primary.regular,
      color: Colors.primary.lightGray,
    },
    message: {
      fontSize: scaleWidth * 17,
      lineHeight: scaleWidth * 22,
      letterSpacing: -0.4,
      fontFamily: Fonts.primary.regular,
      color: Colors.primary.lightGray,
      paddingRight: scaleWidth * 80,
    },
    avatarImage: {
      width: scaleWidth * 44,
      height: scaleWidth * 44,
      borderRadius: (scaleWidth * 44) / 2,
      borderWidth: 2,
    },
    nameContainer: {
      flexDirection: 'column',
      paddingLeft: scaleWidth * 8,
    },
    rightArrow: {
      width: scaleWidth * 8,
      height: scaleHeight * 13,
      marginLeft: scaleWidth * 15,
    },
    viewNoMessage: {
      alignItems: 'center',
      marginTop: scaleHeight * 186,
    },
    imageNoMessage: {
      width: scaleWidth * 63,
      height: scaleWidth * 63,
    },
    textNoMessage: {
      fontSize: scaleWidth * 24,
      lineHeight: scaleHeight * 28,
      color: Colors.primary.heading,
      fontFamily: Fonts.primary.regular,
      marginTop: scaleHeight * 17,
    },
    bottomView: {
      width: scaleWidth * 760,
      height: scaleHeight * 120,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.primary.white,
      position: 'absolute', //Here is the trick
      bottom: 0, //Here is the trick
    },
    messageBoxView: {
      width: scaleWidth * 710,
      height: scaleHeight * 70,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: Colors.primary.inputBackground,
    },
    textInputMessage: {
      width: scaleWidth * 620,
      height: scaleHeight * 50,
      borderRadius: 5,
      padding: 5,
      marginLeft: scaleWidth * 10,
      fontSize: scaleWidth * 15,
      color: darkMode ? Colors.primary.white : Colors.primary.lightGray,
      fontFamily: Fonts.primary.regular,
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.inputBackground,
    },
    attachment: {
      width: scaleWidth * 24,
      height: scaleHeight * 23,
      marginRight: scaleWidth * 24,
    },
    imageHeaderUser: {
      width: scaleWidth * 30,
      height: scaleWidth * 30,
      borderRadius: (scaleWidth * 30) / 2,
    },
    textHeader: {
      fontSize: scaleWidth * 14,
      color: darkMode ? Colors.primary.white : Colors.primary.darkBlack,
      fontFamily: Fonts.primary.regular,
    },
    actionContainer: {
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 4,
      marginRight: 4,
      marginBottom: 0,
    },
    inputToolbar: {
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.white,
      paddingTop: 6,
    },
    sendContainer: {
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
    },
    bubbleWrapperLeft: {
      backgroundColor: Colors.primary.white,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 15,
    },
    bubbleWrapperRight: {
      backgroundColor: Colors.primary.blue,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 0,
    },
    bubbleTextLeft: {
      color: Colors.primary.heading,
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      fontFamily: Fonts.primary.regular,
    },
    bubbleTextRight: {
      color: Colors.primary.white,
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      fontFamily: Fonts.primary.regular,
    },
    avatarContainerLeft: {
      marginLeft: scaleWidth * 10,
      marginRight: scaleWidth * -5,
    },
    avatarContainerRight: {
      marginLeft: scaleWidth * -5,
      marginRight: scaleWidth * 10,
    },
    avatarLeft: {
      width: scaleWidth * 40,
      height: scaleWidth * 40,
      borderRadius: (scaleWidth * 40) / 2,
      borderWidth: 3,
      borderColor: Colors.primary.green,
    },
    avatarRight: {
      width: scaleWidth * 40,
      height: scaleWidth * 40,
      borderRadius: (scaleWidth * 40) / 2,
      borderWidth: 3,
      borderColor: Colors.primary.avatarRight,
    },
    textChatDay: {
      fontSize: scaleWidth * 13,
      lineHeight: scaleWidth * 15,
      color: Colors.primary.lightGray,
      fontFamily: Fonts.primary.regular,
    },
    timeLeft: {
      fontSize: scaleWidth * 12,
      lineHeight: scaleWidth * 22,
      textAlign: 'right',
      color: Colors.primary.lightGray,
      fontFamily: Fonts.primary.regular,
    },
    timeRight: {
      fontSize: scaleWidth * 12,
      lineHeight: scaleWidth * 22,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.regular,
    },
    sendButtonContainer: {
      bottom: 0,
    },
    sendButton: {
      backgroundColor: Colors.primary.darkBlue,
      height: 54,
      width: width * 0.15,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
