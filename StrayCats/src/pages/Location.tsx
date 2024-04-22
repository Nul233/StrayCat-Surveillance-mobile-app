import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonActionSheet, IonToast } from '@ionic/react';
import { GoogleMap, OverlayView } from '@react-google-maps/api';
import { Loader } from "@googlemaps/js-api-loader";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

interface Cat {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  image_url: string; 
  sick: boolean;
  fed: boolean;
}

const CustomMarker: React.FC<{ position: { lat: number; lng: number }; image_url: string; onMarkerClick: () => void }> = ({ position, image_url, onMarkerClick }) => {
  const handleClick = () => {
    onMarkerClick(); 
  };

  return (
    <OverlayView
      position={{ lat: position.lat, lng: position.lng }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <img
        src={image_url}
        alt="Cat Marker"
        style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid white' }}
        onClick={handleClick} // Handle the click event on the image
      />
    </OverlayView>
  );
};

const Location: React.FC = () => {
  const mapStyles: React.CSSProperties = {
    height: '95%',
    width: '100%'
  };

  const defaultCenter = {
    lat: 3.12657790513,
    lng: 101.73666162
  };
  
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState<Cat[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<Cat | null>(null);
  const [showToast, setShowToast] = useState(false); 
  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyDhhQ7nTvsfBSJuFeU8HZU0ba_ZDrKCqYI", 
      version: "weekly",
      libraries: ["places"]
    });

    loader.load().then(() => {
      setLoading(false);
    }).catch(error => {
      console.error('Error loading Google Maps API', error);
    });

    axios.get<Cat[]>('http://localhost/marker.php')
      .then(response => {
        setMarkers(response.data);
      })
      .catch(error => {
        console.error('Error fetching markers:', error);
      });

  }, []);

  const handleMarkerClick = (marker: Cat) => {
    setSelectedMarker(marker); // Set the selected marker when it's clicked
  };

  const hideActionSheet = () => {
    setSelectedMarker(null); // Hide the action sheet when closed
  };

  const markAsFed = () => {
    if (selectedMarker && !selectedMarker.fed) { // Check if the cat is not already fed
      const updatedMarkers = markers.map(cat => {
        if (cat.id === selectedMarker.id) {
          return { ...cat, fed: true };
        }
        return cat;
      });
      setMarkers(updatedMarkers);
    } else {
      setShowToast(true); // Show toast if the cat is already fed
    }
    hideActionSheet();
  };

  const markAsSick = () => {
    if (selectedMarker) {
      const updatedMarkers = markers.map(cat => {
        if (cat.id === selectedMarker.id) {
          return { ...cat, sick: true };
        }
        return cat;
      });
      setMarkers(updatedMarkers);
    }
    hideActionSheet();
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Location</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading && <div>Loading...</div>}
        {!loading && (
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={20}
            center={defaultCenter}
          >
            {markers.map((cat) => (
              <CustomMarker
                key={cat.id}
                position={{ lat: cat.latitude, lng: cat.longitude }}
                image_url={cat.image_url}
                onMarkerClick={() => handleMarkerClick(cat)} 
              />
            ))}
          </GoogleMap>
        )}
        <IonActionSheet
          isOpen={!!selectedMarker}
          onDidDismiss={hideActionSheet}
          header="Cat Details"
          buttons={[
            {
              text: 'View Profile',
              handler: () => {
                // Navigate to cat profile page
                history.push(`/CatProfilePage/${selectedMarker?.id}`);
              }
            },
            {
              text: 'Mark as Fed',
              handler: markAsFed
            },
            {
              text: 'Mark as Sick',
              handler: markAsSick
            },
            {
              text: 'Close',
              role: 'cancel'
            }
          ]}
        />
        {/* IonToast to display when cat is already fed */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message=" This cat has already been fed!"
          duration={2000}
        />
      </IonContent>
    </>
  );
};

export default Location;
