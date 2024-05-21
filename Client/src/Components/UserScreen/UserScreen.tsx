import { useEffect, useState } from "react";
import { getAllVacations } from "../../services/vacationsServices";
import { VacationType } from "../../Models/VacationModel";
import { Card } from "../Card/Card";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from "react-redux";
import './userScreen.css';
import { isDeleted } from "../../features/deletedCardSlice";


export const UserScreen = () => {
    const [vacations, setVacations] = useState<VacationType[]>();
    const removedCard = useSelector((state: any) => state.isDeleted.deleted);
    const dispatch = useDispatch();
    dispatch(isDeleted(false));

    useEffect(() => {
        const fetchAllVacations = async () => {
            const allVacations = await getAllVacations();
            setVacations(allVacations);
        };
        fetchAllVacations();
    }, [removedCard]);

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