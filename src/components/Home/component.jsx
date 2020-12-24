import React, {Component} from 'react'
import './stylesheet.scss'
import logo from '../../assets/images/nus_logo.png'
import {Jumbotron} from 'react-bootstrap'
import PropTypes from 'prop-types'

export default class Home extends Component {

  render(){
    let t = this.context.t

    return <Jumbotron className='home fadeIn mt-5'>
      <h1>{t('home.title')}</h1>
      <p>{t('home.desc')}</p>
      <p>
        <img
          src={logo}
          className="nus-logo mr-1"
          alt="Brand" />
        {t('home.copyright')}
      </p>
    </Jumbotron>
  }

}

Home.contextTypes = {
  t: PropTypes.func
}
