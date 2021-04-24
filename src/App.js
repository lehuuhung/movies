
import React, { lazy, Suspense } from 'react';
import { Skeleton } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,Redirect
} from "react-router-dom";
import 'antd/dist/antd.css';
const HomePage = lazy(() => import('./pages/home'));
const NewFilmComponent = lazy(() => import('./pages/new-film'));
const SearchComponent = lazy(() => import('./pages/search-film'));
const DetailMoviesPageComponent = lazy(() => import('./pages/detail'));
const LoginComponent = lazy(() => import('./pages/login'));



const App = () => {
  return (

    <Router>
      <Suspense fallback={<Skeleton active />}>
        <Switch>
          {/* //switch là lựa chọn các router */}
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/new-film">
            <NewFilmComponent />
          </Route>
          <Route path="/search-film">
            <SearchComponent />
          </Route>
          <Route path="/login">
            <LoginComponent />
          </Route>
          {/* localhost:3000/ngoi-nha-hanh-phuc~132 */}
          <Route path="/movie/:slug~:id">
            <DetailMoviesPageComponent />
          </Route>
          
          <Route extract path="/">
            <HomePage />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App;
