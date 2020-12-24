import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import './stylesheet.scss'
import {
  getProject,
  updateProject} from '../../actions/projects'
import {createFlash} from '../../actions/flashes'
import ProjectForm from '../ProjectForm/component'
import Loading from '../Loading/component'
import PropTypes from 'prop-types'

class CProjectEdit extends Component {

  constructor(props){
    super(props)
    this.state = {
      fetching: true,
      project: {}
    }
  }

  // https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount(){
    let paramId = this.props.match.params.id

    // when project are not existed in redux, so we must fetch project from API
    if (this.state.project.id)
      this.setState({fetching: false})
    else
      this.props.getProject(paramId).then( success => {
         this.setState({fetching: false})
      })
  }

  // https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops
  static getDerivedStateFromProps(nextProps, state){
    let newState = {...state}
    nextProps.project && (newState.project = nextProps.project)
    return newState
  }

  onSubmit(project){
    let t = this.context.t
    return this.props.updateProject(project).then( success => {
      if (success){
        this.props.createFlash({
          type: 'info',
          message: t('alert.update_success', {
            model: t('model.project')
          })
        })
        this.props.history.push('/projects')
      } else {
        this.props.createFlash({
          type: 'error',
          message: t('alert.update_fail', {
            model: t('model.project')
          })
        })
      }
      return success
    })
  }

  render(){
    let t = this.context.t
    return <div className='prj-edit'>
      <h4 className='title'>{t('project.edit.title')}</h4>
      {this.state.fetching ?
        <Loading linesCount={2}/> :
        <ProjectForm
          onSubmit={this.onSubmit.bind(this)}
          project={this.state.project}/>
      }
    </div>
  }
}

CProjectEdit.contextTypes = {
  t: PropTypes.func
}

// https://react-redux.js.org/api/connect#mapstatetoprops-state-ownprops-object
const mapStoreToProps = (store, props) => ({
  project: store.projects
                .data
                // eslint-disable-next-line
                .find( prj => prj.id == props.match.params.id)
})

const mapDispatchToProps = {
  getProject,
  updateProject,
  createFlash
}

const ProjectEdit = connect(
  mapStoreToProps,
  mapDispatchToProps
)(CProjectEdit)

// withRouter will set match, location and history to Component props whenever route changes
export default withRouter(ProjectEdit)