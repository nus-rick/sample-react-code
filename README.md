REACT DEMO FRONTEND
---

### Overview:

Using https://github.com/facebook/create-react-app

* Node version
10.16.2

* NPM version
6.9.0

### Overview:

- Installed NVM https://github.com/nvm-sh/nvm

### Requirement

https://nus-react-demo-backend.herokuapp.com/advanced_requirement

### Production

https://nus-react-demo-frontend.herokuapp.com/

### How To Launch PRJ:

- `touch .env.local`

```
REACT_APP_API_URL=YOUR_API_URL
```
  + Local:
  ```
  REACT_APP_API_URL=http://localhost:4000/v2
  ```

  + Production:
  ```
  REACT_APP_API_URL=https://nus-react-demo-backend.herokuapp.com/v2
  ```

- `nvm install`

- `nvm use`

- `yarn install`

- `yarn start`

- Access `http://localhost:3000`

### How To Deploy To Heroku:

- Add https://github.com/mars/create-react-app-buildpack.git to Heroku BuildPacks

- Add heroku remote

- `git push heroku master`