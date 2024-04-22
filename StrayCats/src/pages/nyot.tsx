import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Route, Redirect } from 'react-router';

import { home, cash, location, logoOctocat,person } from 'ionicons/icons';

import HomePage from './HomePages'
import Donate from './Donate';
import Location from './Location';
import Adoption from './Adoption';
import Profile from './Profile';
import FAQ from './Faq';
import AddCat from './AddCat';

function Page() {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/nyot" to="/Homepages" />
          {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
          <Route path="/HomePages" render={() => <HomePage />} exact={true} />
          <Route path="/Donate" render={() => <Donate />} exact={true} />
          <Route path="/Location" render={() => <Location/>} exact={true} />
          <Route path="/Adoption" render={() => <Adoption/>} exact={true} />
          <Route path="/Profile" render={() => <Profile />} exact={true} />
        
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/HomePages">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="Donation" href="/Donate">
            <IonIcon icon={cash} />
            <IonLabel>Donation</IonLabel>
          </IonTabButton>

          <IonTabButton tab="location" href="/Location">
            <IonIcon icon={location} />
            <IonLabel>Location</IonLabel>
          </IonTabButton>


          <IonTabButton tab="Adoption" href="/Adoption">
            <IonIcon icon={logoOctocat} />
            <IonLabel>Adoption</IonLabel>
          </IonTabButton>
   
          
          <IonTabButton tab="Profile" href="/Profile">
            <IonIcon icon={person} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
         <Route exact path="/faq"><FAQ /></Route>
          <Route exact path="/AddCat"><AddCat/></Route>
    </IonReactRouter>
  );
}
export default Page;