import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add, male, female } from 'ionicons/icons'; 
import axios from 'axios';

import './Homepage.css';

const HomePage: React.FC = () => {
  const [catData, setCatData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const response = await axios.get<any[]>('http://localhost/cat.php');
        setCatData(response.data);
      } catch (error) {
        console.error('Error fetching cat data:', error);
      }
    };

    fetchCatData();
  }, []);

  return (
    <>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {catData.map(cat => (
          <IonCard className="nyot" routerLink={`/CatProfilePage/${cat.id}`} key={cat.id} >
            <img src={cat.image_url} alt={`cat ${cat.id}`} className="gtt" />
            <IonCardHeader>
              <IonCardTitle>
                {cat.name}
                <IonIcon icon={cat.gender === 'male' ? male : female} /> 
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{cat.breed}</IonCardContent>
          </IonCard>
        ))}
        <IonFab horizontal="end" slot="fixed">
          <IonFabButton className='fab' routerLink='/AddCat'>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </>
  );
};

export default HomePage;
