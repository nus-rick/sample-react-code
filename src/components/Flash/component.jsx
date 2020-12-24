import React, {Component} from 'react'
import './stylesheet.scss'
import {Toast} from 'react-bootstrap'
import {connect} from 'react-redux'
import {deleteFlash} from '../../actions/flashes'
import PropTypes from 'prop-types'

class Flash extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentFlash: {},
      show: false
    }
  }

  // https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops
  static getDerivedStateFromProps(nextProps, state){
    let newState = {...state}
    newState.currentFlash = nextProps.flashes[0] || {}
    newState.show = nextProps.flashes.length > 0
    return newState
  }

  // https://reactjs.org/docs/react-component.html#shouldcomponentupdate
  shouldComponentUpdate(nextProps, nextState){
    return nextState.currentFlash.id !== this.state.currentFlash.id
  }

  typeToTitle(flashType){
    let t = this.context.t
    return {
      error: t('error'),
      warning: t('warning'),
      info: t('info')
    }[flashType]
  }

  onClose(){
    this.setState({show: false})
    this.props.deleteFlash(this.state.currentFlash.id)
  }

  render(){
    let flash = this.state.currentFlash
    return <Toast
      className={flash.type}
      onClose={() => this.onClose()}
      show={this.state.show}
      delay={2000}
      autohide>
      <Toast.Header>
        <strong className="mr-auto">
          {this.typeToTitle(flash.type)}
        </strong>
      </Toast.Header>
      <Toast.Body>{flash.message}</Toast.Body>
    </Toast>
  }
}

Flash.contextTypes = {
  t: PropTypes.func
}

const mapStoreToProps = (store) => ({
  flashes: store.flashes
})

const mapDispatchToProps = {
  deleteFlash
}

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(Flash)