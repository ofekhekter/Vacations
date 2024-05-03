import './App.css';
import ResponsiveAppBar from './Components/ResponsiveAppBar/ResponsiveAppBar';
import { Cardd } from './Components/Card/Card';


export const App = () => {
  return (
    <div className="App">
      {/* <ResponsiveAppBar /> */}
      <h1 className='header'>Vacation WebSite</h1>
      <div className='cards'>
        <Cardd location='israel' description='sdlskjdiskd' startDate='28/05/24' endDate='30/07/25' price={4500} imageName='https://www.tripsavvy.com/thmb/G-VwGIBpKdm7Ou8f1akEymgx1lo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/shutterstock_521163331-07bc67ae66dc49b7ae2279c94bb3d99f.jpg' />
        <Cardd location='Turky' description='sdlskjdiskd' startDate='28/05/24' endDate='30/07/25' price={5410} imageName='https://t4.ftcdn.net/jpg/02/65/26/83/360_F_265268314_LmykO3vrtzmh3TQbBdnxj9vUczqqJXCU.jpg' />
        <Cardd location='Italy' description='sdlskjdiskd' startDate='28/05/24' endDate='30/07/25' price={5450} imageName='https://www.goway.com/media/cache/5e/30/5e304c64498d12d8daa59b52f36c3061.jpg' />
        <Cardd location='israel' description='sdlskjdiskd' startDate='28/05/24' endDate='30/07/25' price={1500} imageName='https://cdn.pixabay.com/photo/2015/01/13/13/21/paradise-598201_640.jpg' />
      </div>
    </div>
  );
}