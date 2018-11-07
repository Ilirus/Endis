import {default as RoomStore} from "./RoomStore";
import * as Mobx from "mobx";

const stores = {
  roomStore: new RoomStore()
}
const W: any = window

W['store'] = stores
W['mobx'] = Mobx

export default stores;