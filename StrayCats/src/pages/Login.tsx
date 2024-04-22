import { IonContent, IonPage, IonButton, IonIcon, IonInput, IonToast } from '@ionic/react';
import { mail, lockClosed } from 'ionicons/icons';
import { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
    const [loginData, setLoginData] = useState({
 id: Number,
 email: null,
 password: null,
 userType: null 
 });

 const [isOpen, setIsOpen] = useState(false);
 const [message, setMessage] = useState('')
 const [durations, setDuration] = useState(2000);
 const [position, setPosition] = useState('bottom');

 const history = useHistory();

 const handleInputChange = (e: any) => {
 const { name, value } = e.target;

 console.log(name, value);
 setLoginData({
 ...loginData,
 [name]: value
 })

 }

 const login = () => {
 console.log(loginData, 'loginData');
 axios.post("http://localhost/users.php", loginData)
 .then(
 (response) => {
 if (response.data.length > 0) {
 if (loginData.userType === 'user') {
 history.push('/nyot')
 } else if (loginData.userType === 'admin') {
 history.push('/admin')
 }
 } else {
 showToast('Login Failed!', 2000, 'top')
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
 <IonToast
 isOpen={isOpen}
 onDidDismiss={() => setIsOpen(false)}
 message={message}
 duration={durations}
 position={position} />
 <div className='circle4'></div>
 <form onSubmit={login}>
 <IonInput
 name='email'
 className='email'
 fill="outline"
 type="email"
 placeholder="Enter Email Address"
 onInput={(e) => handleInputChange(e)}
 value={loginData.email}>

 <IonIcon icon={mail} slot="start" />
 </IonInput>
 <IonInput
 name='password'
 className='password'
 fill="outline"
 type="password"
 placeholder="Enter Password Here"
 onInput={(e) => handleInputChange(e)}
 value={loginData.password}>

 <IonIcon icon={lockClosed} slot="start" />
 </IonInput>
 <IonInput
 name='userType'
 className='type'
 fill="outline"
 type="text"
 placeholder="Enter User Type (user/admin)"
 onInput={(e) => handleInputChange(e)}
 value={loginData.userType}>

 </IonInput>
 <IonButton shape='round' className='button2' expand='full' onClick={login} >Login</IonButton>
 </form>
 <p className='text'>Don't have an account?</p><IonButton fill="clear" className="ion-no-padding1" routerLink='SignUp'>Sign Up</IonButton>
 </IonContent>
 </IonPage>

 );
};

export default Login;