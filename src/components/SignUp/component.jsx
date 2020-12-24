import React, {Component} from 'react'
import './stylesheet.scss'
import PropTypes from 'prop-types'
import {buildSchema} from './validation'
import {Formik} from 'formik';
import { registerUser } from '../../actions/redux-token-auth'
import {
  Form,
  Row,
  Col} from 'react-bootstrap'
import LaddaButton from '../LaddaButton/component'
import {
  LiveUpdateValidationMessageService
} from '../../services/live_update_validation_message_service'
import { connect } from 'react-redux'
import {createFlash} from '../../actions/flashes'

class SignUp extends Component {

  constructor(props){
    super(props)
    this.form = React.createRef();
  }

  componentDidUpdate(prevProps, prevState){
    new LiveUpdateValidationMessageService(this).call(
      prevProps,
      prevState
    )
  }

  privateForm = formikProps => {
    let {handleSubmit,
         handleChange,
         isSubmitting,
         errors,
         // values is project object
         values} = {...formikProps}

    // NOTE: 'this' = UserForm
    let t = this.context.t

    return <Form
      noValidate
      className='fadeIn'
      onSubmit={handleSubmit}>
      <Form.Group as={Row} controlId="controlId-email">
        <Form.Label column sm={3}>{t('email')}</Form.Label>
        <Col sm={9}>
          <Form.Control
            readOnly={isSubmitting}
            isInvalid={!!errors.email}
            autoFocus
            onChange={handleChange}
            defaultValue={values.email}
            name='email'
            type="text"
            placeholder={t('email_placeholder')} />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="controlId-name">
        <Form.Label column sm={3}>{t('name')}</Form.Label>
        <Col sm={9}>
          <Form.Control
            readOnly={isSubmitting}
            isInvalid={!!errors.name}
            onChange={handleChange}
            defaultValue={values.name}
            name='name'
            type="text"
            placeholder={t('name_placeholder')} />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="signupform-password">
        <Form.Label column sm={3}>{t('password')}</Form.Label>
        <Col sm={9}>
          <Form.Control
            readOnly={isSubmitting}
            isInvalid={!!errors.password}
            onChange={handleChange}
            defaultValue={values.password}
            name='password'
            type="password"
            placeholder={t('password_placeholder')} />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm={{ span: 9, offset: 3 }}>
          <LaddaButton
            type='submit'
            disabled={isSubmitting} />
        </Col>
      </Form.Group>
    </Form>
  }

  onSubmit(company, actions){
    let t = this.context.t
    this.props.registerUser(company).then( () => {
      this.props.createFlash({
        type: 'info',
        message: t('alert.register_success')
      })
      this.props.history.push('/')
    }).catch( () => {
      actions.setSubmitting(false)
      this.props.createFlash({
        type: 'error',
        message: t('alert.register_fail')
      })
    })
  }

  render(){
    let t = this.context.t
    let schemaValidation = buildSchema(this.props.i18nState.lang, t)

    return <div className='sign-up bounceInLeft'>
      <h4 className='title'>{t('signup').toUpperCase()}</h4>
      <Formik
        ref={this.form}
        component={this.privateForm}
        validationSchema={schemaValidation}
        onSubmit={this.onSubmit.bind(this)}
        initialValues={{email: '', name: '', password: ''}}/>
    </div>
  }
}

SignUp.contextTypes = {
  t: PropTypes.func
}

const mapStoreToProps = (store) => ({
  i18nState: store.i18nState
})

const mapDispatchToProps = {
  registerUser,
  createFlash
}

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(SignUp)