import React, { useState, useRef } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonButtons, IonBackButton, IonSelect, IonSelectOption } from '@ionic/react';
import axios from 'axios';

import './AddCat.css';


const AddCatAdoption: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [breed, setBreed] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<number>(0); // State for age
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  const [validationError, setValidationError] = useState<string>('');


  const fileInputRef = useRef<HTMLInputElement>(null);

 
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !breed || !gender || !image || age <= 0) { // Validate age
      setValidationError('Please fill in all fields and select an image.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('breed', breed);
      formData.append('gender', gender);
      formData.append('age', age.toString()); // Append age to form data
      formData.append('image', image);
     
      await axios.post<void>('http://localhost/AddCatAdoption.php', formData);

      console.log('Cat added successfully');
    } catch (error) {
      console.error('Error adding cat:', error);
    }
  };

  const handleSelectImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/admin" />
          </IonButtons>
          <IonTitle>Add Cat</IonTitle>
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
            value={breed}
            className='ny'
            placeholder="Breed"
            fill="outline"
            onIonChange={(e) => setBreed(e.detail.value!)}
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
          <IonInput
            type="number"
            value={age}
            className='ny'
            placeholder="Age"
            fill="outline"
            onIonChange={(e) => setAge(parseInt(e.detail.value!, 10))}
            required
          />
          <input ref={fileInputRef} type="file" style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} required />
          <IonButton className='ny' onClick={handleSelectImage}>Select Image</IonButton>
          {imageUrl && <img src={imageUrl} alt="Selected Cat" style={{ width: '50%', marginTop: '10px' , marginLeft: '90px' }} />}
          {validationError && <p>{validationError}</p>} {/* Display validation error message */}
          <IonButton className='nyo' type="submit">Submit</IonButton>
        </form>
      </IonContent>
    </>
  );
};

export default AddCatAdoption;
