import { IonActionSheet } from '@ionic/react';
import { IonContent,IonPage, IonButton,} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import Cat from '../assets/Cat.png'


const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <img src={Cat} alt="Cat" className='img'/>
        <div className='circle1'></div>
        <div className='circle2'></div>
        <IonButton routerLink="/Login" shape='round' className='button1' expand='full'>
        Get Started
      </IonButton>
      </IonContent>
      </IonPage>
  );
};

export default Home;
