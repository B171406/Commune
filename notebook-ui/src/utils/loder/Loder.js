import React from 'react';
import '/home/quanteon/notebook1/notebook-ui/src/utils/loder/loder.css'; // Import your loader styling here

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;