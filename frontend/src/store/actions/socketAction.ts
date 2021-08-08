
import { io } from 'socket.io-client';
import { ActionType } from './types';

export const connectSocket = ()  => {
    return (dispatch: Function) => {
        const socket = io("http://localhost", {path: "/socket"});
        dispatch({type: ActionType.SOCKET_CONNECT, payload: {socket}})
    }
}