import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/Home';
import ListItems from './pages/ListItems';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact><Home /></Route>
        <Route path="/list-items" exact><ListItems /></Route>
      </Switch>
    </BrowserRouter>
  )
}
