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
import {getUser} from '../../actions/users'
import PropTypes from 'prop-types'

class CUserShow extends Component {

  constructor(props){
    super(props)
    this.state = {
      fetching: true,
      user: {
        users: []
      }
    }
  }

  static getDerivedStateFromProps(nextProps, state){
    let newState = {...state}
    nextProps.user && (newState.user = nextProps.user)
    return newState
  }

  componentDidMount(){
    let paramId = this.props.match.params.id

    if (this.state.user.id)
      this.setState({fetching: false})
    else if (paramId !== 'new')
      this.props.getUser(paramId).then( success => {
         this.setState({fetching: false})
      })
  }

  renderUsers(){
    let projects = this.state.user.projects
    return projects.length > 0 ?
    <div>
      { projects.map( prj =>
        <Link key={prj.id} to={`/projects/${prj.id}`}>
          <Badge pill variant="secondary" className='tag-link'>
            {prj.name}
          </Badge>
          <hr/>
        </Link>
      )}
    </div> :
    <Badge variant="secondary">N/A</Badge>
  }

  render(){
    if (this.props.match.params.id === 'new')
      return null

    let t = this.context.t
    let user = this.state.user
    return <div className='usr-show fadeIn'>
      <h4 className='title'>{t('user.show.title')}</h4>
      {this.state.fetching ?
        <Loading linesCount={4} maxWidth="500px"/> :
        <React.Fragment>
          <Row>
            <Col sm={3}><strong>{t('email')}</strong></Col>
            <Col>{user.email}</Col>
          </Row>
          <Row className='mt-2'>
            <Col sm={3}><strong>{t('age')}</strong></Col>
            <Col>{user.age}</Col>
          </Row>
          <Row className='mt-2'>
            <Col sm={3}><strong>{t('gender')}</strong></Col>
            <Col>{t(`gender.${user.gender}`)}</Col>
          </Row>
          <Row className='mt-2'>
            <Col sm={3}><strong>{t('position')}</strong></Col>
            <Col>{t(`position.${user.position}`)}</Col>
          </Row>
          <Row className='mt-2'>
            <Col sm={3}><strong>{t('user.joined_prjs')}</strong></Col>
            <Col>{this.renderUsers()}</Col>
          </Row>
        </React.Fragment>
      }
    </div>
  }
}

CUserShow.contextTypes = {
  t: PropTypes.func
}


const mapStoreToProps = (store, props) => ({
  user: store.users
             .data
             // eslint-disable-next-line
             .find( usr => usr.id == props.match.params.id)
})

const mapDispatchToProps = {
  getUser
}

const UserShow = connect(
  mapStoreToProps,
  mapDispatchToProps
)(CUserShow)

export default withRouter(UserShow)