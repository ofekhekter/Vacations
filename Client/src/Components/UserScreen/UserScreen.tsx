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
import { followersCount } from "../../features/followersSlice";
import { FollowingsDataSetModel, FollowingsType } from "../../Models/FollowingsModel";
import './userScreen.css';

export const UserScreen: React.FC = () => {
    const [vacations, setVacations] = useState<VacationType[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [vacationIdsOfUser, setVacationIdsOfUser] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const removedCard = useSelector((state: any) => state.isDeleted.deleted);
    const userEmail = useSelector((state: any) => state.emailAddress.text);
    const dispatch = useDispatch();
    const itemsPerPage: number = 10;

    useEffect(() => {
        dispatch(isDeleted(false));
        const fetchAllVacations = async () => {
            const allFollowings: FollowingsType[] = await getAllFollowings();
            const followingsDataSet: FollowingsDataSetModel[] = allFollowings.map(following => ({
                destination: following.destination,
                followers: following.totalFollowers,
            }));

            dispatch(followersCount(followingsDataSet));
            if (userEmail) {
                const userId = await getUserId(userEmail);
                const { vacations, totalCount } = await getAllVacations(currentPage, userId);
                const vacationIds = vacations.map((vacation: VacationType) => vacation.followedVacationId).filter((vacationId) => vacationId !== null);
                setVacationIdsOfUser(vacationIds);
                setVacations(vacations);
                setTotalCount(totalCount);
            }
        };
        fetchAllVacations();
    }, [removedCard, userEmail, currentPage, dispatch]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const allVacationsCards = vacations.map((vacation, index) => (
        <Card vacationIdsOfUser={vacationIdsOfUser} key={index} vacation={vacation} />
    ));

    return (
        <>
            <Stack spacing={2}>
                <Pagination
                    count={Math.ceil(totalCount / itemsPerPage)}
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
