import React, {Component} from 'react'
import {connect} from 'react-redux'
import './stylesheet.scss'
import {
  deleteProject,
  getProjects} from '../../actions/projects'
import {
  Table,
  Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import ConfirmModal from '../ConfirmModal/component'
import Loading from '../Loading/component'
import {createFlash} from '../../actions/flashes'
import PropTypes from 'prop-types'

class CProjectIndex extends Component {

  constructor(props){
    super(props)
    this.state = {
      deleteControl: {
        message: '',
        currentProject: {}
      }
    }
  }

  // https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount(){
    this.props.currentUser.isSignedIn &&
    this.props.getProjects()
  }

  onDeleteClick(project){
    let {deleteControl} = {...this.state}
    let t = this.context.t

    deleteControl.currentProject = {...project}
    deleteControl.message = t('project.delete.confirm', {
      name: project.name
    })

    this.setState({deleteControl}, () => {
      // https://reactjs.org/docs/refs-and-the-dom.html
      this.refs.confirmModal.toggleModal()
    })
  }

  onConfirmDelete(){
    let t = this.context.t
    return this.props.deleteProject(this.state.deleteControl.currentProject.id)
    .then( success => {
      success ?
      this.props.createFlash({
        type: 'info',
        message: t('alert.delete_success', {
          model: t('model.project')
        })
      }) :
      this.props.createFlash({
        type: 'error',
        message: t('alert.delete_fail', {
          model: t('model.project')
        })
      })
      return success
    })
  }

  renderActions(project){
    return <span>
      <Link to={`/projects/${project.id}/edit`}>
        <i className="fas fa-edit mr-4"></i>
      </Link>
      <i
        onClick={() => this.onDeleteClick(project)}
        className="fas fa-trash-alt cursor-pointer"></i>
    </span>
  }

  renderTable(){
    let props = this.props
    let projects = props.projects
    let t = this.context.t

    if (projects.fetchingStatus === 'fetching')
      return <Loading linesCount={4}/>

    if (projects.fetchingStatus === 'fetched' && projects.data.length === 0)
      return <div className='empty-table fadeIn'>{
        t('no_data', {model: t('model.project')})
      }</div>

    return <Table striped bordered hover className='fadeIn'>
      <thead>
        <tr>
          <th>{t('name')}</th>
          <th style={{width: '200px', textAlign: 'center'}} >{t('actions')}</th>
        </tr>
      </thead>
      <tbody>
        {projects.data.map( prj =>
          <tr className='cursor-pointer' key={prj.id}>
            <td onClick={() =>
                  props.history.push(`/projects/${prj.id}`)}>
              {prj.name}
            </td>
            <td style={{textAlign: 'center'}}>
              {this.renderActions(prj)}
             </td>
          </tr>
        )}
      </tbody>
    </Table>
  }

  render(){
    let t = this.context.t
    return <div className='prj-index'>
      <h4 className='title'>{t('project.index.title')}</h4>
      <Link to='/projects/new'>
        <Button variant="info" className='mb-3'>
          <i className="fas fa-plus mr-2"></i>
          {t('project.new.title')}
        </Button>
      </Link>
      {this.renderTable()}
      <ConfirmModal
        ref='confirmModal'
        onYes={this.onConfirmDelete.bind(this)}
        message={this.state.deleteControl.message}/>
    </div>
  }

}

CProjectIndex.contextTypes = {
  t: PropTypes.func
}

const mapStoreToProps = (store) => ({
  projects: store.projects,
  currentUser: store.reduxTokenAuth.currentUser
})

const mapDispatchToProps = {
  getProjects,
  deleteProject,
  createFlash
}

const ProjectIndex = connect(
  mapStoreToProps,
  mapDispatchToProps
)(CProjectIndex)

// withRouter will set match, location and history to Component props whenever route changes
export default withRouter(ProjectIndex)