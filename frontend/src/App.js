import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import Playground from './pages/Playground'
import Dancebase from './pages/Dancebase'
import Progress from './pages/Progress'
import Developer from './pages/Developer'
import Authenticate from './pages/Authenticate'
import Sidebar from './components/Sidebar/Sidebar'
import Grid from '@material-ui/core/Grid'
import './App.css'

const App = () => {
  const [access, setAccess] = useState(false)

  return (
    <Router>
      <Grid container>
        <Grid item xs={1}>
          <Sidebar />
        </Grid>

        <Grid item container xs={11}>
          <Switch>
            <Route path='/' exact>
              <Playground />
            </Route>
            <Route path='/dancebase' exact>
              <Dancebase />
            </Route>

            <Route path='/progress' exact>
              <Progress />
            </Route>

            <Route path='/developer' exact>
              {access ? (
                <Developer access={setAccess} />
              ) : (
                <Authenticate access={setAccess} />
              )}
            </Route>

            {/* <Route path='/authenticate' exact>
              <Authenticate access={setAccess} />
            </Route> */}

            <Redirect to='/' />
          </Switch>
        </Grid>
      </Grid>
    </Router>
  )
}

export default App
