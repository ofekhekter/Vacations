import React from 'react';
import './App.css';
import { Card } from './Components/Card/Card';

export const App = () => {
  return (
    <div className="App">
      <h1>Vacation WebSite</h1>
      <div className='cards'>
      <Card location='israel' description='sdlskjdiskd' startDate='28/05/24' endDate='30/07/25' price={5500} imageName='sdsdsd'/>
      <Card location='israel' description='sdlskjdiskd' startDate='28/05/24' endDate='30/07/25' price={5500} imageName='sdsdsd'/>
      <Card location='israel' description='sdlskjdiskd' startDate='28/05/24' endDate='30/07/25' price={5500} imageName='sdsdsd'/>
      <Card location='israel' description='sdlskjdiskd' startDate='28/05/24' endDate='30/07/25' price={5500} imageName='sdsdsd'/>
      <Card location='israel' description='sdlskjdiskd' startDate='28/05/24' endDate='30/07/25' price={5500} imageName='sdsdsd'/>
      <Card location='israel' description='sdlskjdiskd' startDate='28/05/24' endDate='30/07/25' price={5500} imageName='sdsdsd'/>
      <Card location='israel' description='sdlskjdiskd' startDate='28/05/24' endDate='30/07/25' price={5500} imageName='sdsdsd'/>
      </div>
    </div>
  );
