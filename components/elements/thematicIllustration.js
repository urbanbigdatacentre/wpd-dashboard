// WPD Thematic Illustration Component

// Package Imports
import {Container, Typography, Box} from "@mui/material";
import Image from 'next/image';

// Local Imports

const ThematicIllustration = ({renderRightOnly}) => {
    return (
            <div style={{
                position: 'relative',
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
            }}
            >
                {
                    renderRightOnly ? (
                        <Box sx={{width: `100%`, display: `flex`, justifyContent: `flex-end`}}>
                            <Image alt={"Rainfall Background Illustration"} src={'/images/thematic-rain-illustration.png'} width={660} height={372} style={{ WebkitTransform: 'scaleX(-1)', transform: 'scaleX(-1)' }}/>
                        </Box>
                    ) : (
                        <>
                            <Image alt={"Rainfall Background Illustration"} src={'/images/thematic-rain-illustration.png'} width={660} height={372}/>
                            <Image alt={"Rainfall Background Illustration"} src={'/images/thematic-rain-illustration.png'} width={660} height={372} style={{ WebkitTransform: 'scaleX(-1)', transform: 'scaleX(-1)' }}/>
                        </>
                    )
                }
            </div>
    );
}

export default ThematicIllustration;