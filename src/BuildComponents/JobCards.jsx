import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red,teal } from '@mui/material/colors';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

function showJobCards(props){

    // const { palette } = createTheme();
    // const { augmentColor } = palette;
    // const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
    // const theme = createTheme({
    //     palette: {
    //         teal: createColor('#F40B27'),
    //     },
    // });

    return (
    <Card style={{width:300}}>
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
                Estimaed salary : {props.details.minJdSalary}-{props.details.maxJdSalary}
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
                Minimum Experience: {props.details.minExp} years
            </Typography>
        </CardContent> 
        <Button variant="contained" color="success" style={{ width: '94%', margin : 'auto',  marginLef:'20px' }}>
            Easy Apply
        </Button>
        <Button variant="contained" color="success" style={{ width: '94%', margin : 'auto' }}>
            Success
        </Button> 
    </Card>
    )
}

export default showJobCards;