import React, { useState, useEffect, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonToggle, IonIcon, IonCard } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import './catprofile.css';

interface Cat {
  id: number;
  name: string;
  breed: string;
  gender: string;
  image_url: string;
  fed: boolean;
  sick: boolean;
}

const CatProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [catData, setCatData] = useState<Cat | null>(null);

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const response = await axios.get<Cat>(`http://localhost/cats.php?id=${id}`);
        setCatData(response.data);
      } catch (error) {
        console.error('Error fetching cat data:', error);
      }
    };

    fetchCatData();
  }, [id]);

  const toggleFedStatus = () => {
    if (catData) {
      setCatData((prevCatData: Cat | null) => ({ ...prevCatData!, fed: !prevCatData!.fed }));
    }
  };

  const toggleSickStatus = () => {
    if (catData) {
      setCatData((prevCatData: Cat | null) => ({ ...prevCatData!, sick: !prevCatData!.sick }));
    }
  };

  if (!catData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" routerLink="/">
            <IonIcon icon={arrowBack} />
          </IonButton>
          <IonTitle>Cat Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        
        <div>
          <IonCard><img src={catData.image_url} alt={`cat ${catData.id}`} className="gmbr" /></IonCard>
          
          <IonCard >
            <p className='txt'>Name: {catData.name}</p>
          </IonCard>
          <IonCard>
          <p className='txt'>Breed: {catData.breed}</p>
          </IonCard>
          <IonCard>
            <p className='txt'>Gender: {catData.gender}</p>
          </IonCard>
          <IonCard>
          <div className='txt' style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginRight: '10px' }}>Fed:</p>
            <IonToggle 
              checked={catData.fed}
              onIonChange={toggleFedStatus}
              color="success"
              slot="end"
            />
            <p>{catData.fed ? 'Yes' : 'No'}</p>
            </div>
          </IonCard>
          <IonCard>
          <div className='txt' style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginRight: '10px' }}>Sick:</p>
            <IonToggle
              checked={catData.sick}
              onIonChange={toggleSickStatus}
              color="danger"
              slot="end"
            />
            <p>{catData.sick ? 'Yes' : 'No'}</p>
            </div>
            </IonCard>
        </div>
        
      </IonContent>
    </>
  );
};

export default CatProfilePage;
