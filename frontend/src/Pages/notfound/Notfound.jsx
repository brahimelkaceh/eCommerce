import React from 'react';
import Navbar from "../../Components/navbar/Navbar" 
import { Link } from 'react-router-dom';

function NotFound() {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#F9F9F9',
      fontFamily: 'Lato, sans-serif',
    },
    number: {
      fontSize: '10rem',
      fontWeight: 'bold',
      color: '#c2945a',
      fontFamily: 'Alegreya Sans, sans-serif',
    },
    text: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#001B24',
      marginTop: '1rem',
    },
    button: {
      backgroundColor: '#001B24',
      color: '#FFFFFF',
      padding: '1rem 2rem',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textDecoration: 'none',
      borderRadius: '5px',
      marginTop: '2rem',
    },
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.number}>404</div>
        <div style={styles.text}>Page not found</div>
        <Link to="/home" style={styles.button}>Go back home</Link>
      </div>
    </>
  );
}

export default NotFound;
