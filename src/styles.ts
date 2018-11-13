import { Palette, build, Options, Multipliers } from 'react-native-better-styles'
 
const palette: Palette = {
  primary_back: '#011153',
  primary_light: '#3DA7F0',
  primary: '#223276',
  grey: '#8a949d',
  white: '#ffffff',
  black: '#000000',
  blue: '#2c5cff',
}

const defaultMultipliers = {
  '0':          0,
  '025':        0.25,
  '05':         0.5,
  '075':        0.75,
  '085':        0.85,
  '1':          1,
  '115':        1.15,
  '125':        1.25,
  '15':         1.5,
  '175':        1.75,
  '185':        1.85,
  '2':          2,
  '225':        2.25,
  '25':         2.5,
  '275':        2.75,
  '3':          3,
  '325':        3.25,
  '35':         3.5,
  '375':        3.75,
  '4':          4,
  '45':         4.5,
  '5':          5,
  '55':         5.5,
  '6':          6,
  '65':         6.5,
  '7':          7,
  '75':         7.5,
  '8':          8
} as Multipliers


build({
  remSize: 15,
  palette,
} as Options)