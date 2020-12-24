import React, {Component} from 'react'
import './stylesheet.scss'
import {
  Button,
  Modal} from 'react-bootstrap'
import LaddaButton from '../LaddaButton/component'
import PropTypes from 'prop-types'

export default class ConfirmModal extends Component {

  constructor(props){
    super(props)
    this.state = {
      show: false,
      message: '',
      processing: false
    }
  }

  // https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops
  static getDerivedStateFromProps(nextProps, state){
    let newState = {...state}
    nextProps.message && (newState.message = nextProps.message)
    return newState
  }

  toggleModal(){
    this.setState({show: true})
  }

  onHide(){
    this.setState({show: false})
  }

  onNo(){
    let onNo = this.props.onNo
    onNo && onNo()
    this.onHide()
  }

  onYes(){
    let onYes = this.props.onYes
    this.setState({processing: true})
    let promise = onYes && onYes()
    if (promise)
      promise.then(success => {
        this.setState({processing: false})
        this.onHide()
      })
    else {
      this.setState({processing: false})
      this.onHide()
    }
  }

  render(){
    let state = this.state
    let t = this.context.t
    let message = state.message || t('are_you_sure')

    return  <Modal
      onHide={() => this.onHide()}
      show={state.show}>
      <Modal.Header closeButton>
        <Modal.Title>{ t('confirmation')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p dangerouslySetInnerHTML={{__html: message}} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={state.processing}
          variant="light"
          onClick={() => this.onNo()}>
          {t('no')}
        </Button>
        <LaddaButton
          onClick={() => this.onYes()}
          text={t('yes')}
          disabled={state.processing}/>
      </Modal.Footer>
    </Modal>
  }
}

ConfirmModal.contextTypes = {
  t: PropTypes.func
}