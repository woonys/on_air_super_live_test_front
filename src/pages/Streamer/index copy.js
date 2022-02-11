import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import { NodeCameraView } from 'react-native-nodemediaclient';
import get from 'lodash/get';
import { LIVE_STATUS, videoConfig, audioConfig } from '../../utils/constants';
import SocketManager from '../../socketManager';
import styles from './styles';
import LiveStreamActionButton from './LiveStreamActionButton';
import ChatInputGroup from '../../components/ChatInputGroup';
import MessagesList from '../../components/MessagesList/MessagesList';
import FloatingHearts from '../../components/FloatingHearts';
import { RTMP_SERVER } from '../../config';
import Logger from '../../utils/logger';

//class형 컴포넌트이기에 useState hook을 사용할 수 없음. 
export default function Streamer(props){

  const { route } = props;
  const roomName = get(route, 'params.roomName');
  const userName = get(route, 'params.userName', '');
  const [currentLiveStatus, setcurrentLiveStatus] = useState(LIVE_STATUS.PREPARE);
  const [messages, setmessages] = useState([]);
  const [countHeart, setcountHeart] = useState(0);
  const [isVisibleMessages, setisVisibleMessages] = useState(true);
  const [footerVisible, setfooterVisible] = useState(true);
  const { roomName } = roomName;
  const { userName } = userName;


  useEffect(()=>{
    requestCameraPermission();
    SocketManager.instance.emitPrepareLiveStream({
      userName: userName,
      roomName: roomName,
    });
    SocketManager.instance.emitJoinRoom({
      userName: userName,
      roomName: roomName,
    });
    SocketManager.instance.listenBeginLiveStream((data) => {
      const currentLiveStatus = get(data, 'liveStatus', '');
      setcurrentLiveStatus({ currentLiveStatus });
    });
    SocketManager.instance.listenFinishLiveStream((data) => {
      const currentLiveStatus = get(data, 'liveStatus', '');
      setcurrentLiveStatus({ currentLiveStatus });
    });
    SocketManager.instance.listenSendHeart(() => {
      setState((prevState) => ({ countHeart: prevState.countHeart + 1 }));
    });
    SocketManager.instance.listenSendMessage((data) => {
      const messages = get(data, 'messages', []);
      setState({ messages });
    });
  },[])

  const componentWillUnmount = () => {
    if (nodeCameraViewRef) nodeCameraViewRef.stop();
    SocketManager.instance.emitLeaveRoom({
      userName: userName,
      roomName: roomName,
    });
  }

  const onPressHideandShow = () => {
    
  }

  const onPressHeart = () => {
    SocketManager.instance.emitSendHeart({
      roomName: roomName,
    });
  };

  const onPressSend = (message) => {
    SocketManager.instance.emitSendMessage({
      roomName: roomName,
      userName: userName,
      message,
    });
    setState({ isVisibleMessages: true });
  };

  const onEndEditing = () => setState({ isVisibleMessages: true });

  const onFocusChatGroup = () => {
    setState({ isVisibleMessages: false });
  };

  const onPressClose = () => {
    const { navigation } = props;
    navigation.goBack(); // 메인으로 돌아가는 기능. navigation: 페이지 간 이동(navi) 기능
  };

  const onPressLiveStreamButton = () => {
    const { navigation, route } = props;
    const userName = get(route, 'params.userName', '');
    const { currentLiveStatus } = state;
    if (Number(currentLiveStatus) === Number(LIVE_STATUS.PREPARE)) {
      /**
       * Waiting live stream
       */
      SocketManager.instance.emitBeginLiveStream({ userName, roomName: userName });
      SocketManager.instance.emitJoinRoom({ userName, roomName: userName });
      if (nodeCameraViewRef) nodeCameraViewRef.start();
    } else if (Number(currentLiveStatus) === Number(LIVE_STATUS.ON_LIVE)) {
      /**
       * Finish live stream
       */
      SocketManager.instance.emitFinishLiveStream({ userName, roomName: userName });
      if (nodeCameraViewRef) nodeCameraViewRef.stop();
      Alert.alert(
        'Alert ',
        'Thanks for your live stream',
        [
          {
            text: 'Okay',
            onPress: () => {
              navigation.goBack();
              SocketManager.instance.emitLeaveRoom({ userName, roomName: userName });
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
        {
          title: 'LiveStreamExample need Camera And Microphone Permission',
          message:
            'LiveStreamExample needs access to your camera so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (
        granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        if (nodeCameraViewRef) nodeCameraViewRef.startPreview();
      } else {
        Logger.log('Camera permission denied');
      }
    } catch (err) {
      Logger.warn(err);
    }
  };

  const renderChatGroup = () => {
    return (
      <ChatInputGroup
        onPressHeart={onPressHeart}
        onPressSend={onPressSend}
        onFocus={onFocusChatGroup}
        onEndEditing={onEndEditing}
      />
    );
  };

  const renderListMessages = () => {
    const [messages, setmessages] = useState();
    const 
    if (!isVisibleMessages) return null;
    return <MessagesList messages={messages} />;
  };

  const setCameraRef = (ref) => {
    nodeCameraViewRef = ref;
  };

  // render() {
  //   const { route } = props;
  //   const { currentLiveStatus, countHeart } = state;
  //   const userName = get(route, 'params.userName', '');
  //   const outputUrl = `${RTMP_SERVER}/live/${userName}`;
  //    // 클릭 시 hide/show 구현
  //   //const [visible, setVisible] = useState(true);
  //   // const onPressScreen = () => {
  //   //   setVisible(!visible);
  //   // }

  return (
    <SafeAreaView style={styles.container}>
      <NodeCameraView
        style={styles.streamerView}
        ref={setCameraRef}
        outputUrl={outputUrl}
        camera={{ cameraId: 1, cameraFrontMirror: true }}
        audio={audioConfig}
        video={videoConfig}
        smoothSkinLevel={3}
        autopreview={false}
      />
      <SafeAreaView style={styles.contentWrapper}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.btnClose} onPress={onPressClose}>
            <Image
              style={styles.icoClose}
              source={require('../../assets/close.png')}
              tintColor="white"
            />
          </TouchableOpacity>
          <LiveStreamActionButton
            currentLiveStatus={currentLiveStatus}
            onPress={onPressLiveStreamButton}
          />
        </View>
        <View style={styles.center}>
        </View>
        <View style={styles.footer}>
          {renderChatGroup()}
          {renderListMessages()}
        </View>
      </SafeAreaView>
      <FloatingHearts count={countHeart} />
    </SafeAreaView>
  );
}


Streamer.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  route: PropTypes.shape({}),
};

Streamer.defaultProps = {
  navigation: {
    goBack: null,
  },
  route: null,
};
