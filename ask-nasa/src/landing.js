import { React, useState, useEffect } from 'react'

import Gallery from "./gallery";
import Nasa from './nasa';

const Landing = () => {

  const [changeSite, setChangeSite] = useState(
    <Gallery>
      <h1>Gallery</h1>
      <button id="dailyBtn" onClick={() => setChangeSite(
        <Nasa>
          <button id="backBtn" onClick={() => setChangeSite(<Landing />)}>Back</button>
        </Nasa>)}>Daily post</button>
      <p>See the last 28 days' pictures</p>
    </Gallery>
  );


  return <>
    {changeSite}
  </>;
};


export default Landing;

{/* <div className="cards-wrapper">
        <div className="theCardsDiv">
          {datas.map((item, index) => {
            if (item.location) {
              return <CharacterCard datas={item} unique={index} key={index} />
            } else {
              return <LocationCard datas={item} unique={index} key={index} />	
            }
          })}
        </div>   
      </div> */}