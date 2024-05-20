import { useEffect, useState } from "react";
import { getAllVacations } from "../../services/vacationsServices";
import { VacationType } from "../../Models/VacationModel";
import { Card } from "../Card/Card";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './userScreen.css';


export const UserScreen = () => {
    const [vacations, setVacations] = useState<VacationType[]>();

    useEffect(() => {
        const fetchAllVacations = async () => {
            const allVacations = await getAllVacations();
            setVacations(allVacations);
        };
        fetchAllVacations();
    }, []);

    const allVacationsCards = vacations?.map((vacation, index) => {

        return (
            <Card key={index} vacation={vacation} />
        );
    });

    return (
        <>
            <Stack spacing={2}>
                <Pagination count={5} variant="outlined" shape="rounded" />
                <section className="homeScreen">
                    {allVacationsCards}
                </section>
            </Stack>
        </>
    );
}