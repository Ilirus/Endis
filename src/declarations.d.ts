declare module 'react-native-svg' {

  import * as React from 'react';
  import * as RN from 'react-native';

  export type SvgElementProps = {
    fill?: string
    fillOpacity?: number
    stroke?: string
    strokeWidth?: number
    strokeOpacity?: number
    strokeLinecap?: 'square' | 'butt' | 'round'
    strokeLinejoin?: 'miter' | 'bevel' | 'round'
    strokeDasharray?: string[]
    strokeDashoffset?: null | number
    x?: number | string
    y?: number | string
    rotate?: number
    scale?: number
    origin?: any
    originX?: number
    originY?: number
    onPress?: (evt: RN.NativeSyntheticEvent<RN.NativeTouchEvent>) => void
    onLongPress?: (evt: RN.NativeSyntheticEvent<RN.NativeTouchEvent>) => void
    onPressOut?: (evt: RN.NativeSyntheticEvent<RN.NativeTouchEvent>) => void
    onPressIn?: (evt: RN.NativeSyntheticEvent<RN.NativeTouchEvent>) => void
    disabled?: boolean
    delayPressIn?: number
    delayPressOut?: number
    delayLongPress?: number
  }

  export type SvgProps = {
    width: number
    height: number
    viewBox?: string
    opacity?: number
    preserveAspectRatio?: string;
    style?: RN.StyleRuleSet;
  }

  export type RectProps = {
    width?: number | string
    height?: number | string
  } & SvgElementProps

  export type ImageProps = {
    preserveAspectRatio?: string
    opacity?: number
    href: () => any
    clipPath?: string
  } & RectProps

  export class Svg extends React.Component<SvgProps> {}
  export class Path extends React.Component<SvgElementProps & { d: string }> {}
  export class Polygon extends React.Component<SvgElementProps & { points: string }> {}
  export class Polyline extends React.Component<SvgElementProps & { points: string }> {}
  export class Rect extends React.Component<RectProps> {}
  export class Line extends React.Component<SvgElementProps & { x1: number; y1: number; x2: number; y2: number }> {}
  export class Circle extends React.Component<
    SvgElementProps & { cx: number; cy: number; rx?: number; ry?: number; r?: number }
  > {}
  export class Ellipse extends React.Component<SvgElementProps> {}
  export class G extends React.Component<SvgElementProps> {}
  export class Image extends React.Component<ImageProps> {}
  export class Text extends React.Component<
    SvgElementProps & {
      fontWeight?: 'bold' | 'normal' | number
      fontSize: number
      dy?: number
      dx?: number
      textAnchor?: 'left' | 'right' | 'middle'
    }
  > {}
}