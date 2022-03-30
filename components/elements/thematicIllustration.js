// WPD Thematic Illustration Component

// Package Imports
import {Container, Typography, Box} from "@mui/material";
import Image from 'next/image';

// Local Imports

export default function ThematicIllustration(props) {
    return (
            <div style={{
                position: 'relative',
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
            }}
            >
                <Image src={'/images/thematic-rain-illustration.png'} width={660} height={372}/>
                <Image src={'/images/thematic-rain-illustration.png'} width={660} height={372} style={{ '-webkit-transform': 'scaleX(-1)', transform: 'scaleX(-1)' }}/>
            </div>
    );
}