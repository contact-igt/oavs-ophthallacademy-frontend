import React from 'react';

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@400;500;600&display=swap');
    
    body {
      font-family: 'Open Sans', sans-serif;
    }
    
    h1, h2, h3, h4, h5, h6, button {
      font-family: 'Montserrat', sans-serif;
    }

    .hero-image-mask {
      mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
      -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
    }
  `}</style>
);

export default GlobalStyles;
