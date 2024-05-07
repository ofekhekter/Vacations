import { useEffect, useState } from "react";
import { Cardd } from "../Card/Card"
import './homeScreen.css';
import { getOneImage } from "../../services/imagesServices";
import { getAllVacations } from "../../services/vacationsServices";
import { VacationType } from "../Signup/VacationModel";


export const HomeScreen = () => {
    const [images, setImages] = useState<Buffer[]>();
    const [vacations, setVacations] = useState<VacationType[]>();

    useEffect(() => {
        const fetchAllVacations = async () => {
            const allVacations = await getAllVacations();
            setVacations(allVacations);
        };
        fetchAllVacations();
        // const image = await getOneImage('');

    }, []);

    const allMoviesCards = vacations?.map((vacation) => {

        return (
            <section className="homeScreen">
                <Cardd location={vacation.location} description={vacation.description} startDate={vacation.startDate} endDate={vacation.endDate} imageName={vacation.imageName} price={vacation.price} />
            </section>
        );
    });

    return (
        <>
{allMoviesCards}
        </>
    );
}