import React from 'react'
import {Redirect} from 'react-router-dom'

  const AUTH_HEADER_KEYS = [
  'access-token',
  'token-type',
  'client',
  'expiry',
  'uid',
]

export class HeaderService {
  setAuthHeaders(config){
    localStorage.getItem('access-token') &&
    AUTH_HEADER_KEYS.forEach(function (key) {
      config.headers[key] = localStorage.getItem(key)
    })
  }

  persistAuthHeadersInLocalStorage(headers){
    headers['access-token'] &&
    AUTH_HEADER_KEYS.forEach( key => {
      headers[key] && localStorage.setItem(key, headers[key])
    })
  }
}

export const requireLoggedOut = (component, isSignedIn) => {
  let MatchedComponent = component
  let RedirectComponent = props => <Redirect to='/' />

  return isSignedIn ? RedirectComponent : MatchedComponent
}