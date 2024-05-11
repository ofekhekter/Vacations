import { useEffect, useState } from "react";
import { getAllVacations } from "../../services/vacationsServices";
import { VacationType } from "../../Models/VacationModel";
import { Card } from "../Card/Card";
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
            <Card key={index} vacation={vacation}/>
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