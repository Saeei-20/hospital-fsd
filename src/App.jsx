import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import the Provider component
import store from './redux/store'; 

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import routes from './Routes/routes';

function App() {
  return (
    <>
     <Provider store={store}> 
        <Router>
          <Navbar />
          <Routes>
            
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
          </Routes>
          <Footer />
        </Router>
        </Provider>
      
    </>
  );
}

export default App;
