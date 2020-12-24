import React, {Component} from 'react'
import {
  // A <Router> that uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.
  BrowserRouter,
  Route,
  // Switch Renders the first child <Route> or <Redirect> that matches the location.
  Switch } from 'react-router-dom'
import Layout from '../components/Layout/component'
import Home from '../components/Home/component'
import SignIn from '../components/SignIn/component'
import SignUp from '../components/SignUp/component'
import ProjectIndex from '../components/ProjectIndex/component'
import ProjectNew from '../components/ProjectNew/component'
import ProjectShow from '../components/ProjectShow/component'
import ProjectEdit from '../components/ProjectEdit/component'
import UserIndex from '../components/UserIndex/component'
import UserNew from '../components/UserNew/component'
import UserShow from '../components/UserShow/component'
import UserEdit from '../components/UserEdit/component'
import { generateRequireSignInWrapper } from 'redux-token-auth'
import {requireLoggedOut} from '../services/auth_service'
import {connect} from 'react-redux'

// https://github.com/kylecorbelli/redux-token-auth#4-generate-the-component-wrapper-to-gate-pages
const requireSignIn = generateRequireSignInWrapper({
  redirectPathIfNotSignedIn: '/signin',
})

// NOTE: This will resolve performance issue whenever lang changed, the component will be not unmounted then re-mounted
const ProjectIndexController = requireSignIn(ProjectIndex)
const ProjectNewController = requireSignIn(ProjectNew)
const ProjectShowController = requireSignIn(ProjectShow)
const ProjectEditController = requireSignIn(ProjectEdit)
const UserIndexController = requireSignIn(UserIndex)
const UserNewController = requireSignIn(UserNew)
const UserShowController = requireSignIn(UserShow)
const UserEditController = requireSignIn(UserEdit)


class Routes extends Component {

  render(){
    let isSignedIn = this.props.currentUser.isSignedIn

    return (
      <BrowserRouter>
        <Switch>
          <Layout>
            <Route exact path="/" component={Home}/>

            <Route exact path="/signin"
                   component={requireLoggedOut(SignIn, isSignedIn)}/>
            <Route exact path="/signup"
                   component={requireLoggedOut(SignUp, isSignedIn)}/>

            <Route exact path="/projects"
                   component={ProjectIndexController}/>
            <Route exact path="/projects/new"
                   component={ProjectNewController}/>
            <Route exact path="/projects/:id"
                   component={ProjectShowController}/>
            <Route exact path="/projects/:id/edit"
                   component={ProjectEditController}/>
            <Route exact path="/users"
                   component={UserIndexController}/>
            <Route exact path="/users/new"
                   component={UserNewController}/>
            <Route exact path="/users/:id"
                   component={UserShowController}/>
            <Route exact path="/users/:id/edit"
                   component={UserEditController}/>
          </Layout>
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapStoreToProps = (store) => ({
  currentUser: store.reduxTokenAuth.currentUser
})

export default connect(
  mapStoreToProps,
  null
)(Routes)