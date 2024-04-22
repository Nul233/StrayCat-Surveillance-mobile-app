import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonCard } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import './catprofile.css';

interface Cat {
  id: number;
  name: string;
  breed: string;
  gender: string;
  age: number;
  image_url: string;
}

const CatAdoptionPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [catData, setCatData] = useState<Cat | null>(null);

  useEffect(() => {
    const fetchCatAdoptionData = async () => {
      try {
        const response = await axios.get<Cat>(`http://localhost/catprofile.php?id=${id}`);
        setCatData(response.data);
      } catch (error) {
        console.error('Error fetching cat data:', error);
      }
    };

    fetchCatAdoptionData();
  }, [id]);

  const handleAdoptNow = () => {
    // Redirect to the adoption form page
    history.push(`/Adopt/${id}`);
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
          <IonCard>
            <p className='txt'>Name: {catData.name}</p>
          </IonCard>
          <IonCard>
            <p className='txt'>Breed: {catData.breed}</p>
          </IonCard>
          <IonCard>
            <p className='txt'>Gender: {catData.gender}</p>
          </IonCard>
          <IonCard>
            <p className='txt'>Age: {catData.age}</p>
          </IonCard>
          <IonButton expand="block" onClick={handleAdoptNow}>Adopt Now</IonButton>
        </div>
      </IonContent>
    </>
  );
};

export default CatAdoptionPage;
