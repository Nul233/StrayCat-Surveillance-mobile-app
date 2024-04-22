import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonButtons, IonBackButton, IonSelect, IonSelectOption, IonDatetime } from '@ionic/react';

const AdoptionFormPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [gender, setGender] = useState<string>('');

  const [timeToMeet, setTimeToMeet] = useState(new Date().toISOString());
 
  const [validationError, setValidationError] = useState<string>('');

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !address || !gender || !timeToMeet) {
      setValidationError('Please fill in all fields.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('address', address);
      formData.append('gender', gender);
      formData.append('timeToMeet', timeToMeet);

      await axios.post<void>('http://localhost/Adopt.php', formData);
      console.log('data added successfully');

    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/nyot" />
          </IonButtons>
          <IonTitle>Adoption Form</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonInput
            value={name}
            className='ny'
            placeholder="Name"
            fill="outline"
            onIonChange={(e) => setName(e.detail.value!)}
            required
          />
          <IonInput
            value={email}
            type="email"
            className='ny'
            placeholder="Email"
            fill="outline"
            onIonChange={(e) => setEmail(e.detail.value!)}
            required
          />
          <IonInput
            value={address}
            className='ny'
            placeholder="Address"
            fill="outline"
            onIonChange={(e) => setAddress(e.detail.value!)}
            required
          />
       
          <IonSelect
            value={gender}
            fill="outline"
            className='ny'
            placeholder="Gender"
            onIonChange={(e) => setGender(e.detail.value)}
          
          >
            <IonSelectOption value="male">Male</IonSelectOption>
            <IonSelectOption value="female">Female</IonSelectOption>
            <IonSelectOption value="other">Other</IonSelectOption>
          </IonSelect>
          
           <IonDatetime
            value={timeToMeet}
            display-Format="MMM DD, YYYY HH:mm"
            className='ny'
            onIonChange={(e) => setTimeToMeet(e.detail.value?.toString() || '')}
          />
             {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
          <IonButton className="nye" type="submit">Submit</IonButton>
          
        </form>
      </IonContent>
    </>
  );
};

export default AdoptionFormPage;
