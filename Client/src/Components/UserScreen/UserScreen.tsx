import { useEffect, useState } from "react";
import { getAllVacations } from "../../services/vacationsServices";
import { VacationType } from "../../Models/VacationModel";
import { Card } from "../Card/Card";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from "react-redux";
import { isDeleted } from "../../features/deletedCardSlice";
import { getUserId } from "../../services/usersServices";
import { getAllFollowings } from "../../services/followingsServices";
import './userScreen.css';


export const UserScreen = () => {
    const [vacations, setVacations] = useState<VacationType[]>();
    const [vacationIdsOfUser, setVacationIdsOfUser] = useState<number[]>();
    const removedCard = useSelector((state: any) => state.isDeleted.deleted);
    const userEmail = useSelector((state: any) => state.emailAddress.text);
    const dispatch = useDispatch();
    dispatch(isDeleted(false));

    useEffect(() => {
        const fetchAllVacations = async () => {
            const allVacations = await getAllVacations();
            setVacations(allVacations);
            const userId = await getUserId(userEmail);
            const allFollowings = await getAllFollowings(userId);
            if (allFollowings !== undefined) {
                const vacationIds: number[] = allFollowings.map((following: { vacationId: number; }) => following.vacationId);
                setVacationIdsOfUser(vacationIds);
            }
        };
        fetchAllVacations();
    }, [removedCard]);

    const allVacationsCards = vacations?.map((vacation, index) => {

        return (
            <Card vacationIdsOfUser={vacationIdsOfUser} key={index} vacation={vacation} />
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