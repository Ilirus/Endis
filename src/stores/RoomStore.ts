import { observable } from 'mobx';
import { Room } from '../models';

 
class RoomStore {
  @observable rooms: Room[] = [];

  saveNote(room: Room) {
    const idx = this.rooms.findIndex(({id}) => room.id === id);
    if (idx < 0) {
      this.rooms.push(room);
    } else {
      this.rooms[idx] = room;
    }
  }

  deleteNote(room: Room) {
    const idx = this.rooms.findIndex(({id}) => id === room.id);
    if (idx < 0) {
      throw new Error(`Note ${room.id} not found`);
    } else {
      this.rooms.splice(idx, 1);
    }
  }

  getNote(roomId: string): Room {
    const idx = this.rooms.findIndex(({id}) => id === roomId);
    if (idx < 0) {
      throw new Error(`Note ${roomId} not found`);
    } else {
      return this.rooms[idx];
    }
  }
}
 
const observableRoomStore = new RoomStore();
const newNote = (title: string, content: number) => {
  const note = {
    id: `$fake` + new Date(),
    name: title,
    costs: content * 5,
    consumption: content * 30,
    customTemperature: content + 2,
    temperature: content,
  };
  observableRoomStore.saveNote(note);
}
 
newNote('Кухня', 18);
newNote('Спальня', 20);
newNote('Зал', 17);

export default observableRoomStore;
 
