import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonAvatar, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import axios from 'axios';
import './Profile.css';

const { Camera } = Plugins;

const AdminPageProfile: React.FC = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>({});
   const youtubeVideoUrl = 'https://youtu.be/uNQyvaszfJQ?list=RDuNQyvaszfJQ';


  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch user data from the backend API
      const response = await axios.post('http://localhost/adminprofile.php');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const selectPicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos
      });

      setProfilePicture(image.webPath);
    } catch (error) {
      console.error('Error selecting picture:', error);
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle >Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid className="ion-justify-content-center">
          <IonRow>
            <IonCol className="ion-text-center">
              <IonAvatar className="profile-avatar">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" />
                ) : (
                  <div className="no-image-text">No Image</div>
                )}
              </IonAvatar>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">
              <IonButton onClick={selectPicture}>Select Picture</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <div className="ion-padding5">
         
          <h1>Name: {userData.name}</h1>
          <h1>Email: {userData.email}</h1>
          
        </div>
        
        <IonButton className="faq" routerLink="/adminFAQ">FAQ</IonButton>
        <IonButton className="usermanual" href={youtubeVideoUrl} target="_blank">
      User Manual
    </IonButton>
        <IonButton className="logout" routerLink="/login">Logout</IonButton>
      </IonContent>
    </>
  );
};

export default AdminPageProfile;
