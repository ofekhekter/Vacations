import { useEffect, useState } from "react";
import { Cardd } from "../Card/Card"
import { getAllVacations } from "../../services/vacationsServices";
import { VacationType } from "../Signup/VacationModel";
import './homeScreen.css';


export const HomeScreen = () => {
    const [vacations, setVacations] = useState<VacationType[]>();

    useEffect(() => {
        const fetchAllVacations = async () => {
            const allVacations = await getAllVacations();
            setVacations(allVacations);
        };
        fetchAllVacations();
    }, []);

    const allMoviesCards = vacations?.map((vacation, index) => {

        return (
            <Cardd key={index} location={vacation.location} description={vacation.description} startDate={vacation.startDate} endDate={vacation.endDate} imageName={vacation.imageName} price={vacation.price} />
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