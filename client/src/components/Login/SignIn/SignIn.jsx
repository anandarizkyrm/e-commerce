import React, {useState ,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {useStyles} from './MakeStyles';
import {Link } from 'react-router-dom';
import {useDispatch ,useSelector} from 'react-redux';
import {signIn} from '../../../actions/index';
import Alert from '@material-ui/lab/Alert';
import  { Redirect } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
    
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignInSide(props) {
  
  const classes = useStyles();
  const [payload , setpayload] = useState({email : '' , password :''});
  const dispatch = useDispatch();


  const userSignIn = useSelector(state => state.userSignIn );
  const {loading , userInfo ,error} =userSignIn;
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

  const handleChange=(e)=>{
    const { value, name } = e.target
    setpayload({...payload,
        [name]:value
    })}
  
  
 
      if (userInfo) {
          return <Redirect to={redirect}  />
      }


    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(signIn(payload.email, payload.password));
  
    }
    console.log(userInfo, error , props.location.search )
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={submitHandler} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange = {(e)=>handleChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange = {(e)=>handleChange(e)}
              autoComplete="current-password"
            />
            {error && 
            <Grid item xs={12}>
                 <Alert severity="error">
                   {error}
                  </Alert>
            </Grid>
            }
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to={redirect === "/" ? "register" : `register?redirect=${redirect}`} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}