import * as t from 'io-ts';

export const Room = t.interface({
  id: t.string,
  name: t.string,
  costs: t.number,
  consumption: t.number,
  customTemperature: t.number,
  temperature: t.number
})
export type Room = t.TypeOf<typeof Room>