import React, { useState, useRef } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonButtons, IonBackButton, IonSelect, IonSelectOption } from '@ionic/react';
import axios from 'axios';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import './AddCat.css';

const mapStyles = {
  height: "300px",
  width: "95%",
  marginLeft: "10px",
  margintop: "10px"
};
const center = {
  lat: 3.12657790513,
  lng: 101.73666162
};

const AddCat: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [breed, setBreed] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [markers, setMarkers] = useState<Array<{ lat: number, lng: number }>>([]);
  const [selectedLocation, setSelectedLocation] = useState(center);
  const [validationError, setValidationError] = useState<string>('');
const libraries = ['places'];


  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDhhQ7nTvsfBSJuFeU8HZU0ba_ZDrKCqYI',
    libraries: ['places']
  });

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

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newMarkers = [...markers, { lat: event.latLng.lat(), lng: event.latLng.lng() }];
      setMarkers(newMarkers);
      setSelectedLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !breed || !gender || !image) {
      setValidationError('Please fill in all fields and select an image.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('breed', breed);
      formData.append('gender', gender);
      formData.append('image', image);
      formData.append('markers', JSON.stringify(markers)); 

      await axios.post<void>('http://localhost/AddCat.php', formData);

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
            <IonBackButton defaultHref="/nyot" />
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
          <input ref={fileInputRef} type="file" style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} required />
          <IonButton className='ny' onClick={handleSelectImage}>Select Image</IonButton>
          {imageUrl && <img src={imageUrl} alt="Selected Cat" style={{ width: '50%', marginTop: '10px' , marginLeft: '90px' }} />}
          <div style={mapStyles}>
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={20}
                center={selectedLocation}
                onClick={handleMapClick}
              >
                {markers.map((marker, index) => (
                  <Marker key={index} position={marker} />
                ))}
              </GoogleMap>
            )}
          </div>
          {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
          <IonButton className="nye" type="submit">Add Cat</IonButton>
        </form>
      </IonContent>
    </>
  );
};

export default AddCat;
