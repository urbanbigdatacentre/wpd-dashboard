// Layout Component for Rainfall Chart - Vis developed with D3


// Package Imports
import {connect} from "react-redux";
import {Box, Container, Divider, Typography} from "@mui/material";


// Local Imports
import MyTooltip from "../../elements/tooltip";
import uiText from "../../../data/ui-text";
import DataTypeFilter from "../../elements/dataTypeFilter";
import RainfallChart from "../../elements/rainfallChart";

// Style Imports
import styles from '../../../styles/modules/location-page/VisSectionLayout.module.css';


// Rainfall Chart Section Component
const RainfallChartSection = ({ toggleLanguage }) => {
    return (
      <Container className={styles.visSectionContainer}>
          <Box className={styles.textLegendWrapper}>
              <Box className={styles.textWrapper}>
                  {/*INSERT TEXT LAYOUT HERE*/}
                  <Box>
                      <MyTooltip title={uiText.locationPage.rainfallChart.title[toggleLanguage.language]} text={uiText.locationPage.rainfallChart.descriptionParOne[toggleLanguage.language] + "\n" + uiText.locationPage.rainfallChart.descriptionParTwo[toggleLanguage.language]}/>
                      <Typography sx={{marginLeft: (theme) => (theme.spacing(2)), marginRight: (theme) => (theme.spacing(1)), fontWeight: (theme) => (theme.typography.fontWeightBold)}} variant={"description"}>{uiText.global.labels.howToRead[toggleLanguage.language]}</Typography>
                  </Box>
                  <Typography variant={'title'}>{uiText.locationPage.rainfallChart.title[toggleLanguage.language]}<span className={'bluePunctuation'}>.</span></Typography>
                  <Divider sx={{width: `60%`, height: (theme) => (theme.spacing(1)), background: `linear-gradient(90deg, #2196F3 0%, #1565C0 100%)`, marginBottom: (theme) => (theme.spacing(2)), marginTop: (theme) => (theme.spacing(1))}}/>
              </Box>
              <Box className={styles.legendWrapper}>
                  {/*INSERT DATA FILTER HERE*/}
                  <DataTypeFilter positionMode={`relative`}/>
              </Box>
          </Box>
          {/*INSERT RAINFALL CHART HERE*/}
          <RainfallChart/>
      </Container>
    );
}

export default connect((state) => state)(RainfallChartSection)