import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonText, IonButtons, IonBackButton } from '@ionic/react';

const AdminFAQ: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Admin"></IonBackButton>
          </IonButtons>
          <IonTitle>FAQ</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>
              <h2>Question 1?</h2>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonText>
              <p>Answer 1.</p>
            </IonText>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Question 2?</h2>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonText>
              <p>Answer 2.</p>
            </IonText>
          </IonItem>
          <IonItem>
            <IonText>
              <p>Question 3?.</p>
            </IonText>
          </IonItem>
          <IonItem>
            <IonText>
              <p>Answer 3.</p>
            </IonText>
            </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AdminFAQ;
