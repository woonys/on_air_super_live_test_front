import io from 'socket.io-client';
import Logger from './utils/logger';
import { SOCKET_IO_SERVER } from './config';

const EVENT_JOIN_ROOM = 'join-room';
const EVENT_LEAVE_ROOM = 'leave-room';
const EVENT_LIST_LIVE_STREAM = 'list-live-stream';
const EVENT_BEGIN_LIVE_STREAM = 'begin-live-stream';
const EVENT_FINISH_LIVE_STREAM = 'finish-live-stream';
const EVENT_SEND_HEART = 'send-heart';
const EVENT_SEND_MESSAGE = 'send-message';
const EVENT_PREPARE_LIVE_STREAM = 'prepare-live-stream';
const EVENT_SEND_REPLAY = 'replay';

function SocketManager(props){
  const [socket, setsocket] = useState(null);

  constructor() {
    if (SocketManager.instance) {
      return SocketManager.instance;
    }
    SocketManager.instance = this;
    this.socket = io.connect(SOCKET_IO_SERVER);
    return this;
  }

  const setupListenDefaultEvents = () => {
    this.socket.on('connect', () => {
      Logger.instance.log('connect');
    });
    this.socket.on('disconnect', () => {
      Logger.instance.log('disconnect');
    });
  }

  //
  // ──────────────────────────────────────────────────────────────── I ──────────
  //   :::::: L I S T E N   E V E N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  const listenPrepareLiveStream = (callback = () => null) => {
    socket.on(EVENT_PREPARE_LIVE_STREAM, () => {
      Logger.instance.log(`${EVENT_PREPARE_LIVE_STREAM} :`);
      return callback();
    });
  }

  const listenBeginLiveStream = (callback = () => null) => {
    socket.on(EVENT_BEGIN_LIVE_STREAM, (data) => {
      Logger.instance.log(`${EVENT_BEGIN_LIVE_STREAM} :`, data);
      return callback(data);
    });
  }

  const listenFinishLiveStream = (callback = () => null) => {
    socket.on(EVENT_FINISH_LIVE_STREAM, (data) => {
      Logger.instance.log(`${EVENT_FINISH_LIVE_STREAM} :`, data);
      return callback(data);
    });
  }

  const listenListLiveStream = (callback = () => null) => {
    socket.on(EVENT_LIST_LIVE_STREAM, (data) => {
      Logger.instance.log(`${EVENT_LIST_LIVE_STREAM} :`, data);
      return callback(data);
    });
  }

  const listenSendHeart = (callback = () => null) => {
    socket.on(EVENT_SEND_HEART, () => {
      Logger.instance.log(`${EVENT_SEND_HEART} :`);
      return callback();
    });
  }

  const listenSendMessage = (callback = () => null) => {
    socket.on(EVENT_SEND_MESSAGE, (data) => {
      Logger.instance.log(`${EVENT_SEND_MESSAGE} :`);
      return callback(data);
    });
  }

  const listenReplay = (callback = () => null) => {
    socket.on(EVENT_SEND_REPLAY, (data) => {
      Logger.instance.log(`${EVENT_SEND_REPLAY} :`);
      return callback(data);
    });
  }

  //
  // ──────────────────────────────────────────────────────────── I ──────────
  //   :::::: E M I T   E V E N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  const emitPrepareLiveStream = ({ userName, roomName }) => {
    socket.emit(EVENT_PREPARE_LIVE_STREAM, { userName, roomName });
  }

  const emitJoinRoom = ({ userName, roomName }) => {
    socket.emit(EVENT_JOIN_ROOM, { userName, roomName });
  }

  const emitLeaveRoom = ({ userName, roomName }) => {
    socket.emit(EVENT_LEAVE_ROOM, { userName, roomName });
  }

  const emitBeginLiveStream = ({ userName, roomName }) => {
    socket.emit(EVENT_BEGIN_LIVE_STREAM, { userName, roomName });
  }

  const emitFinishLiveStream = ({ userName, roomName }) => {
    socket.emit(EVENT_FINISH_LIVE_STREAM, { userName, roomName });
  }

  const emitListLiveStream = () => {
    socket.emit(EVENT_LIST_LIVE_STREAM);
  }

  const emitSendHeart = ({ roomName }) => {
    socket.emit(EVENT_SEND_HEART, { roomName });
  }

  const emitSendMessage = ({ roomName, userName, message }) => {
    socket.emit(EVENT_SEND_MESSAGE, { roomName, userName, message });
  }

  const emitReplay = ({ roomName, userName }) => {
    socket.emit(EVENT_SEND_REPLAY, { roomName, userName });
  }
}

const instance = new SocketManager();

Object.freeze(instance);

export default SocketManager;
