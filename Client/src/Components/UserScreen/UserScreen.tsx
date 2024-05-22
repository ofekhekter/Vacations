import React, { useEffect, useState } from "react";
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

export const UserScreen: React.FC = () => {
    const [vacations, setVacations] = useState<VacationType[]>([]);
    const [vacationIdsOfUser, setVacationIdsOfUser] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10);

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
    }, [removedCard, userEmail]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const indexOfLastVacation = currentPage * itemsPerPage;
    const indexOfFirstVacation = indexOfLastVacation - itemsPerPage;
    const currentVacations = vacations.slice(indexOfFirstVacation, indexOfLastVacation);

    const allVacationsCards = currentVacations.map((vacation, index) => (
        <Card vacationIdsOfUser={vacationIdsOfUser} key={index} vacation={vacation} />
    ));

    return (
        <>
            <Stack spacing={2}>
                <Pagination
                    count={Math.ceil(vacations.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    sx={{ display: "flex", justifyContent: "center" }}
                />
                <div className="homeScreenContainer">
                    <section className="homeScreen">
                        {allVacationsCards}
                    </section>
                </div>
            </Stack>
        </>
    );
}
