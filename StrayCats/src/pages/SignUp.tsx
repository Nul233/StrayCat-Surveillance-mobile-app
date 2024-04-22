import { IonContent,IonPage, IonButton, IonInput, IonIcon,IonToast} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { personCircle, mail, lockClosed, call } from 'ionicons/icons';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './SignUp.css';

const SignUp: React.FC = () => {
    const [SignUpData, setSignUpData] = useState({
        
        name: null,
        phone: null,
        email: null,
        password: null

    });

    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [durations, setDuration] = useState(2000);
    const [position, setPosition] = useState('bottom');

    const history = useHistory();

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        console.log(name, value);
        setSignUpData({
            ...SignUpData,
            [name]: value
        })

    }

    const SignUp = () => {
        console.log(SignUpData, 'SignUpData');
        axios.post("http://localhost/SignUp.php", SignUpData)
            .then(
                (response) => {
                    if (response.data.length > 0) {
                        console.log('Success');
                        history.push('/nyot')
                    }
                    else {
                        showToast('SignUp error!', 2000, 'top')
                    }
                }
        )
        
            .catch((error) => {
                console.log(error);
        })
        
    }

    const showToast = (massage: any, duration: any, position: any) => {
        setMessage(massage);
        setDuration(duration);
        setPosition(position);
        setIsOpen(true);
    }
   

  
    return (
        <IonPage>
        <IonContent className="ion-padding">
        <div className='circle3'></div>
                <div className='circle4'></div>
                <IonToast
                    isOpen={isOpen}
                    onDidDismiss={() => setIsOpen(false)}
                    message={message}
                    duration={durations}
                    position={position} />
                <div className='circle4'></div>
                        <form onSubmit={SignUp}>
                    <IonInput
                        name='name'
                        className='Name'
                        fill="outline"
                        placeholder="Enter Name Here" 
                        onInput={(e) => handleInputChange(e)}
                        value={SignUpData.name}>
                        <IonIcon icon={personCircle} slot="start"/>
                    </IonInput>
                    <IonInput
                        name="phone"
                        className='Phone'
                        fill="outline"
                        placeholder="Enter Phone Number"
                        onInput={(e) => handleInputChange(e)}
                        value={SignUpData.phone}>
                        <IonIcon icon={call} slot="start"/>
                    </IonInput>
                    <IonInput
                        name='email'
                        className='Email'
                        fill="outline"
                        type="email"
                        placeholder="Enter Email Address" 
                        onInput={(e) => handleInputChange(e)}
                        value={SignUpData.email}>
                        <IonIcon icon={mail} slot="start"/>
                    </IonInput>
                    <IonInput
                        name="password"
                        className='password'
                        fill="outline"
                        type="password"
                        placeholder="Enter Password Here"
                        onInput={(e) => handleInputChange(e)}
                        value={SignUpData.password}>
                        <IonIcon icon={lockClosed } slot="start"/>
                    </IonInput>
                    <IonButton  shape='round' className='button2' expand='full' onClick={SignUp}>
SignUp</IonButton>
                </form>
                <p className='text1'>Already Have an Account?</p>
                <IonButton fill="clear" className="ion-no-padding" routerLink='Login'>Sign In</IonButton>
      </IonContent>
        </IonPage>

);
};

export default SignUp;