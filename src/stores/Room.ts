import { observable, action, IObservableArray, IObservableObject } from 'mobx';
import { Room, RemoteData } from '../models';
import { request } from '../api';
import { GET_ROOMS } from '../api/endpoints';
import { decode } from '../utils';
import * as t from 'io-ts';

 
export default class RoomStore {
  @observable rooms: Room[] = [];

  constructor(data?: RoomStore) {
    if (data) {
      const { rooms } = data;
      this.rooms = rooms;
    }
    this.fetchRoom();
  }

  // saveRoom(room: Room) {
  //   const idx = this.rooms.findIndex(({id}) => room.id === id);
  //   console.log(room)
  //   if (idx < 0) {
  //     this.rooms.push(room);
  //   } else {
  //     this.rooms[idx] = room;
  //   }
  // }

  @action
  saveRoom(remoteRoom: RemoteData<Room>) {
    switch (remoteRoom.kind) {
      case 'Fetched':
        this.rooms.push(remoteRoom.data);
        break;
    
      default:
        break;
    }
  }

  deleteRoom(room: Room) {
    const idx = this.rooms.findIndex(({id}) => id === room.id);
    if (idx < 0) {
      throw new Error(`Room ${room.id} not found`);
    } else {
      this.rooms.splice(idx, 1);
    }
  }

  getRoom(roomId: string): Room {
    const idx = this.rooms.findIndex(({id}) => id === roomId);
    if (idx < 0) {
      throw new Error(`Room ${roomId} not found`);
    } else {
      return this.rooms[idx];
    }
  }

  fetchRoom = async() => {
    const response = await request(GET_ROOMS())
    switch (response.kind) {
      case 'Fetched':
        try {
          const inspectionRooms= await decode(
            response.data,
            t.array(
              Room
            ),
            `Inbound fetched data is incorrect`
          )
          inspectionRooms.forEach(room => {
            this.saveRoom({
              kind: 'Fetched',
              data: observable(room),
              fetchedAt: new Date()
            })
          }) 
        } catch (e) {
          // stores.uiStore.createNotification({ message: e.message, type: 'ERROR' })
          console.error(e.message)
        }
        break
      case 'ErrorFetching':
        break
      default:
        break
    }
  }
}
