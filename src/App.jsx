import React, {Component} from 'react';
import {Provider} from 'react-redux'
import store from './config/store'
import Routes from './config/routes'
import './App.scss';
import I18n from "redux-i18n"
import {translations} from "./config/translations"
import { verifyCredentials } from './actions/redux-token-auth'

// https://github.com/kylecorbelli/redux-token-auth#3-verifying-user-credentials-on-app-initialization
verifyCredentials(store)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <I18n translations={translations} initialLang="en">
          <Routes/>
        </I18n>
      </Provider>
    );
  }
}