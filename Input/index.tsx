import { h, ComponentFactory } from 'preact'
import { Size } from 'GECK-UI/types'
import { Wrapper, IconWrapper, Control } from './style'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export default function Input({
  Icon,
  tag = 'input',
  size = Size.Medium,
  fullWidth,
  ...controlProps
}: Omit<JSX.HTMLAttributes, 'size'> & {
  Icon?: ComponentFactory<{ size: Size }>
  tag?: string
  size: Size
  fullWidth?: boolean
}) {
  return (
    <Wrapper size={size} hasIcon={Icon} fullWidth={fullWidth}>
      {Icon && (
        <IconWrapper>
          <Icon size={size} />
        </IconWrapper>
      )}
      <Control tag={tag} {...controlProps} />
    </Wrapper>
  )
}
