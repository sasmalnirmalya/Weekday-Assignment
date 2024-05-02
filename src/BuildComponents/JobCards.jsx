import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red,teal } from '@mui/material/colors';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
      borderRadius: 30, // Set border radius
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)', // Set box shadow
    },
}));

function ShowJobCards(props){

    

    const classes = useStyles();

    // const { palette } = createTheme();
    // const { augmentColor } = palette;
    // const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
    // const theme = createTheme({
    //     palette: {
    //         teal: createColor('#F40B27'),
    //     },
    // });

    return (
    <Card style={{width:300}} className={classes.card}>
        <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                </Avatar>
            }

            title="Company Name"
            subheader={
                <>
                  <Typography variant="subtitle1">{props.details.jobRole} </Typography>
                  <Typography variant="subtitle2">{props.details.location}</Typography>
                  
                </>
              }
            
        />
        <CardContent>
            <Typography>
                Estimaed salary : {props.details.salaryCurrencyCode}{props.details.minJdSalary}-{props.details.maxJdSalary}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
                About Company
            </Typography>
            <Typography gutterBottom variant="body2">
                About us :
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.details.jobDetailsFromCompany}
            </Typography>
            <Typography>
                Minimum Experience: {props.details.minExp} Years
            </Typography>
        </CardContent> 
        <div style={{ width: '94%', margin : 'auto'}}>
            <Button variant="contained" color="success" style={{ width: '100%', marginBottom : '10px' }}>
                Easy Apply
            </Button>
            <Button variant="contained" color="secondary" style={{ width: '100%', marginBottom : '20px' }}>
                Referral Available
            </Button> 
        </div>
    </Card>
    )
}

export default ShowJobCards;