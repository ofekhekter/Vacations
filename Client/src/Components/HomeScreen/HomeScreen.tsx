import { Cardd } from "../Card/Card"
import './homeScreen.css';


export const HomeScreen = () => {
    return <section className="homeScreen">
        <Cardd location="israel" description="blabla blabla" startDate="30/05/1989" endDate="30/05/2090" imageName="https://www.thetopvillas.com/blog/wp-content/uploads/2021/05/rsz_shutterstock_1869263059_1-1.jpg" price={400} />
        <Cardd location="israel" description="blabla blabla" startDate="30/05/1989" endDate="30/05/2090" imageName="https://www.thetopvillas.com/blog/wp-content/uploads/2021/05/rsz_shutterstock_1869263059_1-1.jpg" price={400} />
        <Cardd location="israel" description="blabla blabla" startDate="30/05/1989" endDate="30/05/2090" imageName="https://www.thetopvillas.com/blog/wp-content/uploads/2021/05/rsz_shutterstock_1869263059_1-1.jpg" price={400} />
        <Cardd location="israel" description="blabla blabla" startDate="30/05/1989" endDate="30/05/2090" imageName="https://www.thetopvillas.com/blog/wp-content/uploads/2021/05/rsz_shutterstock_1869263059_1-1.jpg" price={400} />
    </section>
}