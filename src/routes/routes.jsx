// src/routes/routes.js

import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Diagnosis from '../pages/Diagnosis';
import newPatient from '../pages/newPatient'
import patientRecords from "../pages/patientRecords";
import Pharmacy from '../pages/Pharmacy';


const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/Login',
        component: Login
    },
    {
        path: '/Signup',
        component: Signup
    },
    {

        path: '/Diagnosis',
        component: Diagnosis,
    },
    {
        path: '/newPatient',
        component: newPatient,
    },
    
    {
        path: '/patientRecords',
        component: patientRecords,
    },
    {
        path: '/Pharmacy',
        component: Pharmacy,
    },
   
    
];

export default routes;

