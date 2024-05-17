import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export const HomePage = () => {
    return (
        <ImageList sx={{ width: '100%', height: '100%', overflow: 'hidden' }} cols={4} rowHeight={500}>
            {itemData.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

const itemData = [
    {
        img: 'http://localhost:3001/static/homeImages/home1.jpg',
        title: 'home1',
    },
    {
        img: 'http://localhost:3001/static/homeImages/home2.jpg',
        title: 'home2',
    },
    {
        img: 'http://localhost:3001/static/homeImages/home3.jpg',
        title: 'home3',
    },
    {
        img: 'http://localhost:3001/static/homeImages/home4.jpg',
        title: 'home4',
    },
    {
        img: 'http://localhost:3001/static/homeImages/home5.jpg',
        title: 'home5',
    },
    {
        img: 'http://localhost:3001/static/homeImages/home6.jpg',
        title: 'home6',
    },
    {
        img: 'http://localhost:3001/static/homeImages/home7.jpg',
        title: 'home7',
    },
    {
        img: 'http://localhost:3001/static/homeImages/home8.jpg',
        title: 'home8',
    },
    {
        img: 'http://localhost:3001/static/homeImages/home9.jpg',
        title: 'home9',
    },
    {
        img: 'http://localhost:3001/static/homeImages/home10.jpg',
        title: 'home10',
    },
    {
        img: 'http://localhost:3001/static/homeImages/home11.jpg',
        title: 'home11',
    },
    {
        img: 'http://localhost:3001/static/homeImages/home12.jpg',
        title: 'home12',
    },
];
