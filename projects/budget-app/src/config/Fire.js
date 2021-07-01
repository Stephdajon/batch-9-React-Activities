import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCmFrADBRX5MQmH-29YCpuKC93_Vcl6YB0",
    authDomain: "budget-app-a4353.firebaseapp.com",
    projectId: "budget-app-a4353",
    storageBucket: "budget-app-a4353.appspot.com",
    messagingSenderId: "636527554342",
    appId: "1:636527554342:web:90f198490bef1fd4049be7",
    measurementId: "G-0T8S8DZSE3"
}

const fire = firebase.initializeApp(config);
export default fire;