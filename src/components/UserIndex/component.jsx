import React, {Component} from 'react'
import {connect} from 'react-redux'
import './stylesheet.scss'
import {
  deleteUser,
  getUsers} from '../../actions/users'
import {getProjects} from '../../actions/projects'
import {
  Table,
  Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import ConfirmModal from '../ConfirmModal/component'
import Loading from '../Loading/component'
import {createFlash} from '../../actions/flashes'
import PropTypes from 'prop-types'
import ReactPaginate from 'react-paginate';

class CUserIndex extends Component {

  constructor(props){
    super(props)
    this.state = {
      deleteControl: {
        message: '',
        currentUser: {}
      }
    }
  }

  componentDidMount(){
    if (this.props.currentUser.isSignedIn) {
      this.props.getUsers()
      this.props.getProjects()
    }
  }

  onDeleteClick(user){
    let {deleteControl} = {...this.state}
    let t = this.context.t

    deleteControl.currentUser = {...user}
    deleteControl.message = t('user.delete.confirm', {
      name: user.email
    })

    this.setState({deleteControl}, () => {
      this.refs.confirmModal.toggleModal()
    })
  }

  onConfirmDelete(){
    let t = this.context.t
    return this.props.deleteUser(this.state.deleteControl.currentUser.id)
    .then( success => {
      success ?
      this.props.createFlash({
        type: 'info',
        message: t('alert.delete_success', {
          model: t('model.user')
        })
      }) :
      this.props.createFlash({
        type: 'error',
        message: t('alert.delete_fail', {
          model: t('model.user')
        })
      })
      return success
    })
  }

  renderActions(user){
    return <span>
      <Link to={`/users/${user.id}/edit`}>
        <i className="fas fa-edit mr-4"></i>
      </Link>
      <i
        onClick={() => this.onDeleteClick(user)}
        className="fas fa-trash-alt cursor-pointer"></i>
    </span>
  }

  fetching(){
    let props = this.props
    return props.projectsFetchingStatus === 'fetching' ||
           props.users.fetchingStatus === 'fetching'
  }

  renderTable(){
    let props = this.props
    let users = this.props.users
    let t = this.context.t

    if (this.fetching())
      return <Loading linesCount={4}/>

    if (users.fetchingStatus === 'fetched' && users.data.length === 0)
      return <div className='empty-table fadeIn'>{
        t('no_data', {model: t('model.user')})
      }</div>

    return <Table striped bordered hover className='fadeIn'>
      <thead>
        <tr>
          <th>{t('email')}</th>
          <th style={{width: '200px', textAlign: 'center'}} >{t('actions')}</th>
        </tr>
      </thead>
      <tbody>
        {users.data.map( usr =>
          <tr className='cursor-pointer' key={usr.id}>
            <td onClick={() =>
                  props.history.push(`/users/${usr.id}`)}>
              {usr.email}
            </td>
            <td style={{textAlign: 'center'}}>
              {this.renderActions(usr)}
             </td>
          </tr>
        )}
      </tbody>
    </Table>
  }

  handlePageClick(index){
    let nextPage = index.selected + 1
    this.props.getUsers(nextPage)
  }

  renderPagination(){
    return <ReactPaginate
      previousLabel={'‹'}
      nextLabel={'›'}
      breakLabel={'...'}
      pageCount={this.props.users.metaData.totalPages}
      pageRangeDisplayed={5}
      onPageChange={this.handlePageClick.bind(this)}
      containerClassName={'pagination'}
      activeClassName={'active'}/>
  }

  render(){
    let t = this.context.t
    return <div className='usr-index'>
      <h4 className='title'>{t('user.index.title')}</h4>
      <Link to='/users/new'>
        <Button variant="info" className='mb-3'>
          <i className="fas fa-plus mr-2"></i>
          {t('user.new.title')}
        </Button>
      </Link>
      {this.renderTable()}
      {this.renderPagination()}
      <ConfirmModal
        ref='confirmModal'
        onYes={this.onConfirmDelete.bind(this)}
        message={this.state.deleteControl.message}/>
    </div>
  }

}

CUserIndex.contextTypes = {
  t: PropTypes.func
}

const mapStoreToProps = (store) => ({
  users: store.users,
  projectsFetchingStatus: store.projects.fetchingStatus,
  currentUser: store.reduxTokenAuth.currentUser
})

const mapDispatchToProps = {
  getUsers,
  deleteUser,
  createFlash,
  getProjects
}

const UserIndex = connect(
  mapStoreToProps,
  mapDispatchToProps
)(CUserIndex)

// withRouter will set match, location and history to Component props whenever route changes
export default withRouter(UserIndex)