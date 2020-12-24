import React, {Component} from 'react'
import './stylesheet.scss'
import {
  Button,
  Spinner} from 'react-bootstrap'
import PropTypes from 'prop-types'

export default class LaddaButton extends Component {

  render(){
    let t = this.context.t
    let disabled = this.props.disabled
    let text = this.props.text || t('submit')

    return <Button {...this.props} >
      {disabled ?
        <Spinner animation="border" size="sm" /> :
        text}
    </Button>
  }

}

LaddaButton.contextTypes = {
  t: PropTypes.func
}

// https://reactjs.org/docs/typechecking-with-proptypes.html#default-prop-values
LaddaButton.defaultProps = {
  variant: 'info'
}