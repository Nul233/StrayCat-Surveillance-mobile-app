import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { home, planet, location, search } from 'ionicons/icons';
import Home from './pages/Home';
import Login from './pages/Login';
import Page from './pages/nyot';
import SignUp from './pages/SignUp';
import CatProfilePage from './pages/CatProfilePage';
import AddCat from './pages/AddCat';
import FAQ from './pages/Faq';
import CatAdoptionPage from './pages/CatAdoptionPage';
import Admin from './pages/Admin';
import AddCatAdoption from './pages/AddCatAdoption';
import AdoptionFormPage from './pages/Adopt'
import AdminFAQ from './pages/AdminFAQ';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
         <Route exact path="/Login">
          <Login />
        </Route>
       <Route exact path="/nyot">
          <Page/>
        </Route>
        <Route exact path="/SignUp">
          <SignUp />
        </Route>
        <Route exact path="/AddCatAdoption">
          <AddCatAdoption />
          </Route>
          <Route exact path="/Faq">
          <FAQ/>
        </Route>
          <Route exact path="/AddCat">
          <AddCat/>
        </Route>
        <Route exact path="/Admin">
          <Admin />
        </Route>
          <Route exact path="/AdminFAQ">
          <AdminFAQ/>
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/CatProfilePage/:id" component={CatProfilePage} />
        <Route path="/CatAdoptionPage/:id" component={CatAdoptionPage} />
          <Route path="/Adopt/:id" component={AdoptionFormPage} />
        <Route exact path="/AddCat">
          <AddCat />
          </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
