import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Route, Redirect } from 'react-router';

import { playCircle, radio, library,  } from 'ionicons/icons';

import AdminPage from '../AdminPage';
import AddAdoptionCat from './AddAdoptionCat';
import AdminPageProfile from './AdminPageProfile';

import AdminFAQ from './AdminFAQ';

function Example() {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/admin" to="/AdminPage" />
          {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
          <Route path="/AdminPage" render={() => <AdminPage />} exact={true} />
          <Route path="/AddAdoptionCat" render={() => < AddAdoptionCat />} exact={true} />
          <Route path="/AdminPageProfile" render={() => <AdminPageProfile/>} exact={true} />
       
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="AdminPage" href="/AdminPage">
            <IonIcon icon={playCircle} />
            <IonLabel>Home Admin</IonLabel>
          </IonTabButton>

          <IonTabButton tab="AddAdoptionCat" href="/AddAdoptionCat">
            <IonIcon icon={radio} />
            <IonLabel>Add Cat</IonLabel>
          </IonTabButton>

          <IonTabButton tab="AdminProfile" href="/AdminPageProfile">
            <IonIcon icon={library} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>

           <Route exact path="/AdminFAQ">< AdminFAQ /></Route>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
}
export default Example;