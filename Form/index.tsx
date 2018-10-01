import { Component } from 'preact'
import {
  FormRenderProp,
  FormComponentProps,
  FormComponentState
} from '../types'

export default class Form extends Component<
  FormComponentProps,
  FormComponentState
> {
  componentWillMount() {
    const { initialForm, onInitialState } = this.props
    const initialFormState = Object.assign({}, initialForm(this.props), {
      submitting: false
    })
    this.setState({ form: initialFormState })
    onInitialState && onInitialState(initialFormState)
  }

  render() {
    const renderChildren = (this.props.children as [FormRenderProp])[0]
    return renderChildren(this, this.state.form)
  }
}
