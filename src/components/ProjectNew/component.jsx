import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import './stylesheet.scss'
import {createProject} from '../../actions/projects'
import {createFlash} from '../../actions/flashes'
import ProjectForm from '../ProjectForm/component'
import PropTypes from 'prop-types'

class CProjectNew extends Component {

  onSubmit(project){
    let t = this.context.t
    return this.props.createProject(project).then( success => {
      if (success){
        this.props.createFlash({
          type: 'info',
          message: t('alert.create_success', {
            model: t('model.project')
          })
        })
        this.props.history.push('/projects')
      } else {
        this.props.createFlash({
          type: 'error',
          message: t('alert.create_fail', {
            model: t('model.project')
          })
        })
      }
      return success
    })
  }

  render(){
    let t = this.context.t
    return <div className='prj-new'>
      <h4 className='title'>{t('project.new.title').toUpperCase()}</h4>
      <ProjectForm
        onSubmit={this.onSubmit.bind(this)}
      />
    </div>
  }
}

CProjectNew.contextTypes = {
  t: PropTypes.func
}

const mapDispatchToProps = {
  createProject,
  createFlash
}

const ProjectNew = connect(
  null,
  mapDispatchToProps
)(CProjectNew)

// withRouter will set match, location and history to Component props whenever route changes
export default withRouter(ProjectNew)
