import { Size, CSSProps } from 'GECK-UI/types'

export function Wrapper(
  props: CSSProps & {
    size?: Size
    hasIcon?: boolean
    fullWidth?: boolean
  }
): JSX.Element

export function IconWrapper(props: CSSProps): JSX.Element

export function Control(props: CSSProps): JSX.Element
