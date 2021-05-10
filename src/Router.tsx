import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import ListItems from './pages/ListItems';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact><Redirect to="/list-items" /></Route>
        <Route path="/list-items" exact><ListItems /></Route>
      </Switch>
    </BrowserRouter>
  )
}
