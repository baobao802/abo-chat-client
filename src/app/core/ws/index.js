import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import localStore from '../../shared/utils/localStore';

const ws = Stomp.over(
  () =>
    new SockJS(
      `${process.env.REACT_APP_BASE_URL}ws` || 'http://localhost:8080/api/v1/ws'
    )
);

ws.configure({
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

export default ws;

export const onConnect = cb => {
  ws.connect({}, function (frame) {
    cb(frame);
  });
};

export const subscribe = (des, resolve) => {
  ws.subscribe(des, resolve);
};

export const sendMessage = (des, payload) => {
  const sender = localStore.getItem('sender');
  if (sender && payload) {
    ws.send(des, { sender: sender.username }, JSON.stringify(payload));
  }
};
