import { useEffect, useState } from "react";
import { Cardd } from "../Card/Card"
import './homeScreen.css';
import { getOneImage } from "../../services/imagesServices";
import { getAllVacations } from "../../services/vacationsServices";
import { VacationType } from "../Signup/VacationModel";


export const HomeScreen = () => {
    const [vacations, setVacations] = useState<VacationType[]>();

    useEffect(() => {
        const fetchAllVacations = async () => {
            const allVacations = await getAllVacations();
            setVacations(allVacations);
        };
        fetchAllVacations();
    }, []);

    const allMoviesCards = vacations?.map((vacation) => {

        return (
            <Cardd location={vacation.location} description={vacation.description} startDate={vacation.startDate} endDate={vacation.endDate} imageName={vacation.imageName} price={vacation.price} />
        );
    });

    return (
        <>
            <section className="homeScreen">
                {allMoviesCards}
            </section>
        </>
    );
}