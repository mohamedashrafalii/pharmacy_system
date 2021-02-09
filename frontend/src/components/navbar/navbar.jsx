import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Medicines from "../medicine/medicine.jsx"
import Invoice from "../Invoice/Invoice.jsx"
import Button from "@material-ui/core/Button"
import User from "../users/users.jsx"
import axios from "axios"
import staticVariables from "../statics.json"
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs(props) {


  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if(props.value&&props.type===props.match.params.type)
{
  return (

    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Medicines" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Selling" href="/trash" {...a11yProps(1)} />
          {props.match.params.type==="admin"&&
          <LinkTab label="Users" href="/" {...a11yProps(2)} />
          }
          <button style={{background:"inherit",color:"white"}} onClick={async()=>{localStorage.removeItem("token")
localStorage.removeItem("type")
          await axios.get(staticVariables.backendUrl+"/auth/Logout")
                          window.location.href="https://pharmacystem.herokuapp.com"

                        }}>LOGOUT</button>
         </Tabs>

      </AppBar>
      <TabPanel value={value} index={0}>
      <Medicines key="1" value={props.value}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Invoice key="2" value={props.value}/>
      </TabPanel>
      {props.type==="admin"&&
      <TabPanel value={value} index={2}>
        <User key="3" value={props.value}/>
      </TabPanel>
}
    </div>
  );
}else {return  (
  <h1 style={{color:"red"}}>Not Authorized</h1>
)
}
}
