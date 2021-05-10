import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import ListItems from './pages/ListItems';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact><ListItems /></Route>
      </Switch>
    </BrowserRouter>
  )
}
