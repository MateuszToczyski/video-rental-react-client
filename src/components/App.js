import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import Header from './Header';
import ErrorNotifier from './ErrorNotifier';

import CustomerCreate from './customers/CustomerCreate';
import CustomerEdit from './customers/CustomerEdit';
import CustomerDelete from './customers/CustomerDelete';
import CustomerList from './customers/CustomerList';
import CustomerShow from './customers/CustomerShow';

import GroupCreate from './groups/GroupCreate.js';
import GroupDelete from './groups/GroupDelete.js';
import GroupEdit from './groups/GroupEdit.js';
import GroupList from './groups/GroupList.js';

import CategoryCreate from './categories/CategoryCreate.js';
import CategoryDelete from './categories/CategoryDelete.js';
import CategoryEdit from './categories/CategoryEdit.js';
import CategoryList from './categories/CategoryList.js';

import VideoCreate from './videos/VideoCreate';
import VideoEdit from './videos/VideoEdit';
import VideoDelete from './videos/VideoDelete';
import VideoList from './videos/VideoList';
import VideoShow from './videos/VideoShow';

import CopyShow from './copies/CopyShow';
import CopyEdit from './copies/CopyEdit';
import CopyDelete from './copies/CopyDelete';

import RentalCreate from './rentals/RentalCreate';
import RentalShow from './rentals/RentalShow';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Header />
        <div className="ui container">
          <ErrorNotifier />
          <Switch>
            <Route path={["/", "/customers"]} exact component={CustomerList} />
            <Route path="/customers/new" exact component={CustomerCreate} />
            <Route path="/customers/edit/:id" exact component={CustomerEdit} />
            <Route path="/customers/delete/:id" exact component={CustomerDelete} />
            <Route path="/customers/:id" exact component={CustomerShow} />
            <Route path="/customers/:id/rentals/new" exact component={RentalCreate} />
            <Route path="/customers/:customerId/rentals/:rentalId" exact component={RentalShow} />

            <Route path="/groups" exact component={GroupList} />
            <Route path="/groups/new/forced" exact render={() => <GroupCreate forced={true} />} />
            <Route path="/groups/new" exact render={() => <GroupCreate forced={false} />} />
            <Route path="/groups/edit/:id" exact component={GroupEdit} />
            <Route path="/groups/delete/:id" exact component={GroupDelete} />

            <Route path="/categories" exact component={CategoryList} />
            <Route path="/categories/new/forced" exact render={() => <CategoryCreate forced={true} />} />
            <Route path="/categories/new" exact render={() => <CategoryCreate forced={false} />} />
            <Route path="/categories/edit/:id" exact component={CategoryEdit} />
            <Route path="/categories/delete/:id" exact component={CategoryDelete} />

            <Route path="/videos" exact component={VideoList} />
            <Route path="/videos/new" exact component={VideoCreate} />
            <Route path="/videos/edit/:id" exact component={VideoEdit} />
            <Route path="/videos/delete/:id" exact component={VideoDelete} />
            <Route path="/videos/:id" exact component={VideoShow} />

            <Route path="/videos/:videoId/copies/:copyId" exact component={CopyShow} />
            <Route path="/videos/:videoId/copies/:copyId/edit" exact component={CopyEdit} />
            <Route path="/videos/:videoId/copies/:copyId/delete" exact component={CopyDelete} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;