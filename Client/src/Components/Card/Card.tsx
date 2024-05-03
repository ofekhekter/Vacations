import './card.css';

interface CardProps {
    id?: number;
    location: string;
    description: string;
    startDate: string;
    endDate: string;
    price: number;
    imageName: string;
}

export const Card = ({ location, description, startDate, endDate, price, imageName }: CardProps) => {
    return <div className="cardContainer">
        <h4>{location}</h4>
        <h2>{description}</h2>
        <p>{startDate}</p>
        <p>{endDate}</p>
        <p>{price}</p>
        <p>{imageName}</p>
    </div>

    
}