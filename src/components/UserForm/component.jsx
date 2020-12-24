import React, {Component} from 'react'
import './stylesheet.scss'
import {
  Form,
  Row,
  Col} from 'react-bootstrap'
import LaddaButton from '../LaddaButton/component'
import {connect} from 'react-redux'
import Loading from '../Loading/component'
import {getProjects} from '../../actions/projects'
import PropTypes from 'prop-types'
import {buildSchema} from './validation';
import {Formik} from 'formik';
import OptionsService from '../../services/options_service'
import {
  LiveUpdateValidationMessageService
} from '../../services/live_update_validation_message_service'

class UserForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      user: {
        gender: 'male',
        project_ids: [],
        position: "developer"
      }
    }
    this.form = React.createRef();
  }

  componentDidUpdate(prevProps, prevState){
    new LiveUpdateValidationMessageService(this).call(
      prevProps,
      prevState
    )
  }

  componentDidMount(){
    let props = this.props
    props.projects.fetchingStatus === 'never' && props.getProjects()
  }

  static getDerivedStateFromProps(nextProps, state){
    let nextUser = {...nextProps.user}
    if (nextUser && nextUser.id !== state.user.id) {
      state.user = {
        ...nextUser,
        project_ids: nextUser.projects.map(prj => prj.id)
      }
    }
    return state
  }

  onSubmit(user, actions){
    let params = {...user}
    this.props.onSubmit(params).then(success => {
      !success && actions.setSubmitting(false)
    })
  }

  customFormikHandleChange(e){
    let {user} = {...this.state}
    let target = e.target
    let form = this.form.current

    user.project_ids = target.checked ?
      [...user.project_ids, target.value] :
      // eslint-disable-next-line
      user.project_ids.filter(id => id != target.value)

    form.setFieldValue('project_ids', user.project_ids)
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
    let projects = this.props.projects

    let renderProjects = <Form.Group as={Row} controlId="userform-prjids">
      <Form.Label column sm={2}>{t('user.joined_prjs')}</Form.Label>
      <Col sm={10}>
        {projects.fetchingStatus === 'fetching' ? <Loading linesCount={3} /> : projects.data.map( (prj, i) =>
          <Form.Check
            readOnly={isSubmitting}
            key={prj.id}
            type="checkbox"
            label={prj.name}
            onChange={this.customFormikHandleChange.bind(this)}
            value={prj.id}
            defaultChecked={values.project_ids.includes(prj.id)}
            name="project_ids">
          </Form.Check>
        )}
      </Col>
    </Form.Group>

    return <Form
      className='fadeIn'
      onSubmit={handleSubmit}>
      {/*------------------- email*/}
      <Form.Group as={Row} controlId="userform-email">
        <Form.Label column sm={2}>{t('email')}</Form.Label>
        <Col sm={10}>
          <Form.Control
            readOnly={isSubmitting}
            autoFocus
            isInvalid={!!errors.email}
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
      {/*------------------- age*/}
      <Form.Group as={Row} controlId="userform-age">
        <Form.Label column sm={2}>{t('age')}</Form.Label>
        <Col sm={10}>
          <Form.Control
            readOnly={isSubmitting}
            onChange={handleChange}
            isInvalid={!!errors.age}
            defaultValue={values.age}
            name='age'
            type="number"
            placeholder={t('age_placeholder')} />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      {/*------------------- gender*/}
      <Form.Group as={Row} controlId="userform-gender">
        <Form.Label column sm={2}>{t('gender')}</Form.Label>
        <Col sm={10}>
          {new OptionsService(t).genderOptions().map( (opt, i) =>
            <Form.Check
              readOnly={isSubmitting}
              inline
              key={i}
              isInvalid={!!errors.gender}
              type="radio"
              label={opt.name}
              onChange={handleChange}
              value={opt.value}
              defaultChecked={values.gender === opt.value}
              name='gender'>
            </Form.Check>
          )}
          <Form.Control.Feedback type="invalid">
            {errors.gender}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      {/*------------------- position*/}
      <Form.Group as={Row} controlId="userform-postion">
        <Form.Label column sm={2}>{t('position')}</Form.Label>
        <Col sm={10}>
          <Form.Control
            readOnly={isSubmitting}
            as="select"
            isInvalid={!!errors.position}
            onChange={handleChange}
            value={values.position}
            name='position'>
            {new OptionsService(t).userPositionOptions().map( (opt, i) =>
              <option key={i} value={opt.value}>{opt.name}</option>
            )}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.position}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      {/*------------------- projects*/}
      {renderProjects}
      {/*------------------- submit*/}
      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <LaddaButton
            type='submit'
            disabled={isSubmitting} />
        </Col>
      </Form.Group>
    </Form>
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
      initialValues={this.state.user}/>
  }
}

UserForm.contextTypes = {
  t: PropTypes.func
}

const mapStoreToProps = (store) => ({
  projects: store.projects,
  i18nState: store.i18nState
})

const mapDispatchToProps = {
  getProjects
}

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(UserForm)
