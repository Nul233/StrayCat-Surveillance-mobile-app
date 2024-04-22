import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonText, IonButtons, IonBackButton } from '@ionic/react';

const FAQ: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>FAQ</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>
              <h2>Why i can see location?</h2>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonText>
              <p>maybe because you not turn on the location.</p>
            </IonText>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Why i can see cat image?</h2>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonText>
              <p>maybe you internet connection error .</p>
            </IonText>
          </IonItem>
          
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default FAQ;
