import { generateAuthActions } from 'redux-token-auth'
import { config } from '../config/redux-token-auth'

// https://github.com/kylecorbelli/redux-token-auth#tldr
export const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)