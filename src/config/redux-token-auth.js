const authUrl = `${process.env.REACT_APP_API_URL}/auth`

export const config = {
  authUrl,
  // https://github.com/kylecorbelli/redux-token-auth#user-and-user-registration-attributes
  userAttributes: {
    email: 'email'
  },
  userRegistrationAttributes: {
    name: 'name',
    email: 'email'
  },
}