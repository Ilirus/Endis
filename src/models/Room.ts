import * as t from 'io-ts';

export const Room = t.interface({
  id: t.string,
  name: t.string,
  costs: t.number,
  consumption: t.number,
  customTemperature: t.number,
  temperature: t.number,
  atHome: t.boolean,
  isDay: t.boolean,
  radiatorStatus: t.union([
    t.literal('on'),
    t.literal('off'),
    t.literal('half'),
  ])
})
export type Room = t.TypeOf<typeof Room>