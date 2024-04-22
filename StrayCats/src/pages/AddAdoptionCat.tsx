import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonFab, IonFabButton, IonIcon, IonButton, IonAlert } from '@ionic/react';
import { add, male, female, trash } from 'ionicons/icons'; 
import axios from 'axios';

import './Homepage.css';

const HomePage: React.FC = () => {
  const [catData, setCatData] = useState<any[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [catToDelete, setCatToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const response = await axios.get<any[]>('http://localhost/Adoption.php');
        setCatData(response.data);
      } catch (error) {
        console.error('Error fetching cat data:', error);
      }
    };

    fetchCatData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost/Adoption.php?id=${id}`);
      setCatData(catData.filter(cat => cat.id !== id));
    } catch (error) {
      console.error('Error deleting cat:', error);
    }
  };

  const handleDeleteConfirmation = (id: string) => {
    setCatToDelete(id);
    setShowAlert(true);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>Adopt cat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {catData.map(cat => (
          <IonCard className="nyot" key={cat.id}>
            <img src={cat.image_url} alt={`cat ${cat.id}`} className="gtt" />
            <IonCardHeader>
              <IonCardTitle>
                {cat.name}
                <IonIcon icon={cat.gender === 'male' ? male : female} /> 
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{cat.breed}</IonCardContent>
            <IonButton color="danger" onClick={() => handleDeleteConfirmation(cat.id)}>
              <IonIcon icon={trash} slot="start" />
              Delete
            </IonButton>
          </IonCard>
        ))}
        <IonFab horizontal="end" slot="fixed">
          <IonFabButton className='fab' routerLink='/AddCatAdoption'>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Delete Cat'}
          message={'Are you sure you want to delete this cat?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                setCatToDelete(null);
              }
            },
            {
              text: 'Delete',
              handler: () => {
                if (catToDelete) {
                  handleDelete(catToDelete);
                }
              }
            }
          ]}
        />
      </IonContent>
    </>
  );
};

export default HomePage;
