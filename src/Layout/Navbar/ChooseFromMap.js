import React from 'react';
 
export default function ChooseFromMap() {
  return (
    <div>
      {/* <h1>Your React Component</h1> */}
      <iframe src={`${process.env.PUBLIC_URL}/Map.html`} title="Embedded HTML Page" width="100%" height="670px" />
    </div>
  );
}
 