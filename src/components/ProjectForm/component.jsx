import React, {Component} from 'react'
import './stylesheet.scss'
import {
  Form,
  Row,
  Col} from 'react-bootstrap'
import LaddaButton from '../LaddaButton/component'
import PropTypes from 'prop-types'
import {Formik} from 'formik';
import {buildSchema} from './validation';
import {connect} from 'react-redux'
import {
  LiveUpdateValidationMessageService
} from '../../services/live_update_validation_message_service'

class ProjectForm extends Component {

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
      <Form.Group as={Row} controlId="prjform-name">
        <Form.Label column sm={2}>{t('name')}</Form.Label>
        <Col sm={10}>
          <Form.Control
            readOnly={isSubmitting}
            isInvalid={!!errors.name}
            autoFocus
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
      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <LaddaButton
            type='submit'
            disabled={isSubmitting} />
        </Col>
      </Form.Group>
    </Form>
  }

  // https://jaredpalmer.com/formik/docs/api/formik#onsubmit-values-values-formikbag-formikbag-void
  onSubmit(project, actions){
    this.props.onSubmit(project).then(success => {
      !success && actions.setSubmitting(false)
    })
  }

  render(){
    let schemaValidation = buildSchema(
      this.props.i18nState.lang,
      this.context.t)
    return <Formik
      ref={this.form}
      component={this.privateForm}
      validationSchema={schemaValidation}
      onSubmit={this.onSubmit.bind(this)}
      initialValues={this.props.project}/>
  }
}

ProjectForm.contextTypes = {
  t: PropTypes.func
}

const mapStoreToProps = (store) => ({
  i18nState: store.i18nState
})

export default connect(
  mapStoreToProps,
  null
)(ProjectForm)
