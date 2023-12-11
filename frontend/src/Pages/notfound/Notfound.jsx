import React from 'react';

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
  };

  return (
    <div style={styles.container}>
      <div style={styles.number}>404</div>
      <div style={styles.text}>Page not found</div>
    </div>
  );
}

export default NotFound;
