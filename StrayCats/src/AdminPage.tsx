// AdminPage.tsx
import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';
import axios from 'axios';

const AdminPage: React.FC = () => {
  const [adoptionData, setAdoptionData] = useState<any[]>([]);
  

  useEffect(() => {
    // Fetch adoption form information when the component mounts
    fetchAdoptionData();
  }, []);

  const fetchAdoptionData = async () => {
    try {
      const response = await axios.get('http://localhost/adoptiondata.php');
      setAdoptionData(response.data);
    } catch (error) {
      console.error('Error fetching adoption data:', error);
    }
  };

  const fetchCatData = async () => {
    try {
      const response = await axios.get('http://localhost/adoptiondata.php');
      setAdoptionData(response.data);
    } catch (error) {
      console.error('Error fetching adoption data:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost/adoption.php?id=${id}`);
      console.log('Adoption form data deleted successfully');
      // Update adoptionData state after deletion
      setAdoptionData(adoptionData.filter(data => data.id !== id));
    } catch (error) {
      console.error('Error deleting adoption form data:', error);
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            flexDirection: 'column',
          }}
        >
          {/* Render each adoption form data as a card */}
          {adoptionData.map(data => (
            <IonCard key={data.id}>
              <IonCardHeader>
                <IonCardSubtitle>Adoption Form Information</IonCardSubtitle>
                <IonCardTitle>{data.cat_name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>Email: {data.name}</p>
                <p>Email: {data.email}</p>
                <p>Address: {data.address}</p>
                <p>Date for Meeting: {data.time_to_meet}</p>
                {/* Delete button */}
                <IonButton color="danger" onClick={() => handleDelete(data.id)}>Delete</IonButton>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      </IonContent>
    </>
  );
};

export default AdminPage;
