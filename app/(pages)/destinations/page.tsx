import React from 'react';
import { getServerData, postServerData } from 'app/utils/handlersApi';

async function Destinations({params}) {
  const res = await postServerData("destinations", {});
 // const res = await fetch(`${process.env.NEXTAUTH_URL}/api/destinations`, {method: "POST", body: JSON.stringify({})}).catch(err => console.log(err));
  console.log({params, resss: res});
  
   return (
      <div>Destinations</div>
   )
}

export default Destinations;