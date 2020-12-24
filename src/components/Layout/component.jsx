import React, {Component} from 'react'
import './stylesheet.scss'
import Header from '../Header/component'
import Flash from '../Flash/component'
import {connect} from 'react-redux'
import Loading from '../Loading/component'

class Layout extends Component {

  render(){
    let currentUser = this.props.currentUser
    // Understand about props.children https://reactjs.org/docs/jsx-in-depth.html#children-in-jsx, e.g https://jsfiddle.net/od8sb94w/1/
    return <div>
      <Header/>
      <Flash/>
      <div className='container main-content'>
        {currentUser.isLoading ?
           <Loading linesCount={10} /> :
           this.props.children
        }
      </div>
    </div>
  }

}

const mapStoreToProps = (store) => ({
  currentUser: store.reduxTokenAuth.currentUser
})

export default connect(
  mapStoreToProps,
  null
)(Layout)