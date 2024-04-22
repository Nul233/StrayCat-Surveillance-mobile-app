import React, { useState } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonInput, IonButton, IonToast } from '@ionic/react';
import cat2 from '../assets/cat2.jpg';
import axios from 'axios';
import './Donate.css';

const Donate: React.FC = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [donationAmount, setDonationAmount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [donations, setDonations] = useState<{ name: string; amount: number }[]>([]);

  const handleDonate = async () => {
    if (amount.trim() !== '') {
      const donatedAmount = parseFloat(amount);
      setDonationAmount(prevAmount => prevAmount + donatedAmount);
      setShowToast(true);
      setAmount('');

      try {
        // Make a POST request to your PHP script
        await axios.post('http://localhost/donate.php', { name: name || 'Anonymous', amount: donatedAmount });
        
        // Add the donation to the list
        setDonations(prevDonations => [...prevDonations, { name: name || 'Anonymous', amount: donatedAmount }]);
      } catch (error) {
        console.error('Error donating:', error);
      }
    } else {
      // Handle empty input
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="danger">
          <IonTitle>Donation</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <IonCard className="card" >
          <IonImg src={cat2} alt="cat2" className='img2' />
          
          <IonCardHeader>
            <IonCardTitle>Donate for Stray Cats</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonInput 
              name='name'
              placeholder="Enter Name Here"
              value={name}
              fill="outline"
              onIonChange={(e) => setName(e.detail.value!)}
            ></IonInput>
            <IonInput 
              type="number" 
              className='nu'
              fill="outline"
              placeholder="Enter amount" 
              value={amount}
              onIonChange={(e) => {
                if (e.target.value !== null && e.target.value !== undefined) {
                  setAmount(e.target.value.toString());
                }
              }}
            />
            <IonButton expand="block" className="ion-margin-top" onClick={handleDonate}>Donate Now</IonButton>
          </IonCardContent>
        </IonCard>
        
        <IonCard className="card" color="secondary">
          <IonCardHeader>
            <IonCardTitle>Total Donations</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            RM{donationAmount.toFixed(2)}
          </IonCardContent>
        </IonCard>

        {/* Display each donation as a separate card */}
        {donations.map((donation, index) => (
          <IonCard key={index} className="card" color="success">
            <IonCardHeader>
              <IonCardTitle>Donation by {donation.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Amount: RM{donation.amount.toFixed(2)}
            </IonCardContent>
          </IonCard>
        ))}
        
      </IonContent>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Thank you for your donation!"
        duration={2000}
      />
    </>
  );
};

export default Donate;
