import { useEffect, useState } from "react";
import { getAllVacations } from "../../services/vacationsServices";
import { VacationType } from "../../Models/VacationModel";
import { Card } from "../Card/Card";
import './userScreen.css';


export const UserScreen = () => {
    const [vacations, setVacations] = useState<VacationType[]>();

    useEffect(() => {
        const fetchAllVacations = async () => {
            const allVacations = await getAllVacations();
            setVacations(allVacations);
        };
        fetchAllVacations();
    }, [vacations]);

    const allVacationsCards = vacations?.map((vacation, index) => {

        return (
            <Card key={index} vacation={vacation}/>
        );
    });

    return (
        <>
            <section className="homeScreen">
                {allVacationsCards}
            </section>
        </>
    );
}