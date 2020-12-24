import React, {Component} from 'react'
import './stylesheet.scss'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {
  Row,
  Badge,
  Col} from 'react-bootstrap'
import Loading from '../Loading/component'
import {getProject} from '../../actions/projects'
import PropTypes from 'prop-types'

class CProjectShow extends Component {

  constructor(props){
    super(props)
    this.state = {
      fetching: true,
      project: {
        users: []
      }
    }
  }

  // https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops
  static getDerivedStateFromProps(nextProps, state){
    let newState = {...state}
    nextProps.project && (newState.project = nextProps.project)
    return newState
  }

  // https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount(){
    let paramId = this.props.match.params.id

    // when project are not existed in redux, so we must fetch project from API
    if (this.state.project.id)
      this.setState({fetching: false})
    else if (paramId !== 'new')
      this.props.getProject(paramId).then( success => {
         this.setState({fetching: false})
      })
  }

  renderUsers(){
    let users = this.state.project.users
    return users.length > 0 ?
    <div>
      { users.map(user =>
        <Link key={user.id} to={`/users/${user.id}`}>
          <Badge pill variant="secondary" className='tag-link'>
            {user.email}
          </Badge>
          <hr/>
        </Link>
      )}
    </div> :
    <Badge variant="secondary">N/A</Badge>
  }

  render(){
    let t = this.context.t
    if (this.props.match.params.id === 'new')
      return null

    return <div className='prj-show fadeIn'>
      <h4 className='title'>{t('project.show.title')}</h4>
      {this.state.fetching ?
        <Loading linesCount={2} maxWidth="500px"/> :
        <React.Fragment>
          <Row>
            <Col sm={3}><strong>{t('name')}</strong></Col>
            <Col>{this.state.project.name}</Col>
          </Row>
          <Row className='mt-2'>
            <Col sm={3}><strong>{t('project.users_joined')}</strong></Col>
            <Col>{this.renderUsers()}</Col>
          </Row>
        </React.Fragment>
      }
    </div>
  }
}

CProjectShow.contextTypes = {
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
  getProject
}

const ProjectShow = connect(
  mapStoreToProps,
  mapDispatchToProps
)(CProjectShow)

// withRouter will set match, location and history to Component props whenever route changes
export default withRouter(ProjectShow)