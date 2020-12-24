import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import './stylesheet.scss'
import {createUser} from '../../actions/users'
import {createFlash} from '../../actions/flashes'
import UserForm from '../UserForm/component'
import PropTypes from 'prop-types'

class CUserNew extends Component {

  onSubmit(user){
    let t = this.context.t
    return this.props.createUser(user).then( success => {
      if (success){
        this.props.createFlash({
          type: 'info',
          message: t('alert.create_success', {
            model: t('model.user')
          })
        })
        this.props.history.push('/users')
      } else {
        this.props.createFlash({
          type: 'error',
          message: t('alert.create_fail', {
            model: t('model.user')
          })
        })
      }
      return success
    })
  }

  render(){
    let t = this.context.t

    return <div className='usr-new'>
      <h4 className='title'>{t('user.new.title').toUpperCase()}</h4>
      <UserForm
        onSubmit={this.onSubmit.bind(this)}
      />
    </div>
  }
}

CUserNew.contextTypes = {
  t: PropTypes.func
}

const mapDispatchToProps = {
  createUser,
  createFlash
}

const UserNew = connect(
  null,
  mapDispatchToProps
)(CUserNew)

export default withRouter(UserNew)
