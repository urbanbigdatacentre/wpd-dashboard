// WPD Landing About the Project Component

// Package Imports

// Local Imports

import {Box, Container, Typography} from "@mui/material";

export default function About() {
    return (
      <AboutSectionContainer>
          <Box sx={{textAlign: `left`}}>
                <Typography>About the Project</Typography>
                <Typography>About the Project</Typography>
          </Box>
      </AboutSectionContainer>
    );
}

const AboutSectionContainer = styled(Container)(({theme}) => ({
    paddingTop: theme.spacing(15),
    display: `flex`,
    justifyContent: `space-between`
}))