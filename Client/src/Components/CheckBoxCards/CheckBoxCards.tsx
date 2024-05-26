import { useSelector } from "react-redux";
import { CheckBoxCard } from "./CheckBoxCard";
import { VacationType } from "../../Models/VacationModel";
import './checkBoxCard.css';

export const CheckBoxCards = () => {
    const vacations: VacationType[] = useSelector((state: any) => state.vacations.vacations);
    const allVacationsCards = vacations.map((vacation: VacationType, index) => (
        <CheckBoxCard key={index} vacation={vacation} />
    ));

    return (
        <>
            <section className="homeScreen">
                {allVacationsCards}
            </section>
        </>
    );
}