import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import './stylesheet.scss'
import {
  getUser,
  updateUser} from '../../actions/users'
import {createFlash} from '../../actions/flashes'
import UserForm from '../UserForm/component'
import Loading from '../Loading/component'
import PropTypes from 'prop-types'

class CUserEdit extends Component {

  constructor(props){
    super(props)
    this.state = {
      fetching: true,
      user: {}
    }
  }

  componentDidMount(){
    let paramId = this.props.match.params.id

    if (this.state.user.id)
      this.setState({fetching: false})
    else
      this.props.getUser(paramId).then( success => {
         this.setState({fetching: false})
      })
  }

  static getDerivedStateFromProps(nextProps, state){
    let newState = {...state}
    nextProps.user && (newState.user = nextProps.user)
    return newState
  }

  onSubmit(user){
    let t = this.context.t
    return this.props.updateUser(user).then( success => {
      if (success){
        this.props.createFlash({
          type: 'info',
          message: t('alert.update_success', {
            model: t('model.user')
          })
        })
        this.props.history.push('/users')
      } else {
        this.props.createFlash({
          type: 'error',
          message: t('alert.update_fail', {
            model: t('model.user')
          })
        })
      }
      return success
    })
  }

  render(){
    let t = this.context.t

    return <div className='usr-edit'>
      <h4 className='title'>{t('user.edit.title')}</h4>
      {this.state.fetching ?
        <Loading linesCount={4}/> :
        <UserForm
          onSubmit={this.onSubmit.bind(this)}
          user={this.state.user}/>
      }
    </div>
  }
}

CUserEdit.contextTypes = {
  t: PropTypes.func
}

const mapStoreToProps = (store, props) => ({
  user: store.users
             .data
             // eslint-disable-next-line
             .find( usr => usr.id == props.match.params.id)
})

const mapDispatchToProps = {
  getUser,
  updateUser,
  createFlash
}

const UserEdit = connect(
  mapStoreToProps,
  mapDispatchToProps
)(CUserEdit)

export default withRouter(UserEdit)