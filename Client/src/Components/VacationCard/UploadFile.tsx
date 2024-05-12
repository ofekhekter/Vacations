import React from 'react';
import { Input } from '@mui/material';
import { styled } from '@mui/system';
import { pathToFileURL } from 'url';
import { Image, Label } from '@mui/icons-material';


const StyledInput = styled('input')({
    display: 'none',
});

const CustomFileInput = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            width: '300px',
            height: '120px',
            border: '1px solid black',
            backgroundImage: 'http://localhost:3001/static/images/No-Image.png',
        }}>
            <label htmlFor="file-input">
                <span>Select Image</span>
                <StyledInput id="file-input" type="file" className="filetype" />
            </label>
        </div>
    );
};

export default CustomFileInput;