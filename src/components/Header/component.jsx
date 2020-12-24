import React, {Component} from 'react'
import './stylesheet.scss'
import {
  Spinner,
  Button,
  ButtonToolbar,
  NavDropdown,
  Navbar,
  Nav} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import logo from '../../assets/images/react_logo.svg'
import {Form} from 'react-bootstrap'
import {connect} from 'react-redux'
import {setLanguage} from "redux-i18n"
import PropTypes from 'prop-types'
import OptionsService from '../../services/options_service'
import {signOutUser} from '../../actions/redux-token-auth'
import {withRouter} from 'react-router'
import {createFlash} from '../../actions/flashes'

class CHeader extends Component {

  renderBrand(){
    return <NavLink to='/'>
      <Navbar.Brand>
        <img
          src={logo}
          className="app-logo"
          alt="Brand" />
      </Navbar.Brand>
    </NavLink>
  }

  onChangeLanguage(e){
    this.props.setLanguage(e.target.value)
  }

  renderLanguagesSelection(){
    let t = this.context.t
    return <Form inline className='lang-form'>
      <Form.Control
        as="select"
        onChange={ e => this.onChangeLanguage(e)}
        defaultValue={this.props.i18nState.lang}
        name='language'>
        {new OptionsService(t).langOptions().map( (opt, i) =>
          <option key={i} value={opt.value}>{opt.name}</option>
        )}
      </Form.Control>
    </Form>
  }

  renderLinks(){
    let t = this.context.t

    return <Nav className="mr-auto">
      <Navbar.Text className='mr-3'>
        <NavLink
          to='/projects'
          activeClassName="choosen">
          {t('header.projects')}
        </NavLink>
      </Navbar.Text>
      <Navbar.Text className='mr-3'>
        <NavLink
          to='/users'
          activeClassName="choosen">
          {t('header.users')}
        </NavLink>
      </Navbar.Text>
        {this.renderLanguagesSelection()}
    </Nav>
  }

  logOut(){
    let t = this.context.t
    this.props.signOutUser().then(() => {
      this.props.createFlash({
        type: 'info',
        message: t('alert.logout_success')
      })
      this.props.history.push('/')
    }).catch( () => {
      this.props.createFlash({
        type: 'error',
        message: t('alert.logout_fail')
      })
    })
  }

  renderAuthentication(){
    let t = this.context.t
    let currentUser = this.props.currentUser

    if (currentUser.isLoading)
      return <Spinner
        className='mr-3'
        animation="border"
        variant="secondary"
        size="sm" />

    return currentUser.isSignedIn ?
      <Nav className='fadeIn'>
        <NavDropdown title={currentUser.attributes.email}>
          <NavDropdown.Item onClick={this.logOut.bind(this)}>
            {t('logout')}
          </NavDropdown.Item>
        </NavDropdown>
      </Nav> :
      <ButtonToolbar className='auth-controls fadeIn'>
        <NavLink to='/signin' className='mr-2'>
          <Button variant="info">{t('signin')}</Button>
        </NavLink>
        <NavLink to='/signup'>
          <Button variant="secondary">{t('signup')}</Button>
        </NavLink>
      </ButtonToolbar>
  }

  render(){
    return <Navbar bg="dark" variant="dark" expand="lg" className='header'>
      {this.renderBrand()}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {this.renderLinks()}
        {this.renderAuthentication()}
      </Navbar.Collapse>
    </Navbar>
  }

}

CHeader.contextTypes = {
  t: PropTypes.func
}

const mapStoreToProps = (store) => ({
  i18nState: store.i18nState,
  currentUser: store.reduxTokenAuth.currentUser
})

const mapDispatchToProps = {
  setLanguage,
  signOutUser,
  createFlash
}

const Header = connect(
  mapStoreToProps,
  mapDispatchToProps
)(CHeader)


export default withRouter(Header)