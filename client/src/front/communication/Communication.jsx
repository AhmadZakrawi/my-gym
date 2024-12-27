import React, { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Paper, Select, Tab, Tabs, TextField, Typography } from '@mui/material';
import TextEditor from '../components/Editor/Editor';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import PeopleIcon from "@mui/icons-material/People";
import ScheduleIcon from '@mui/icons-material/Schedule';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
function Step1({ handleNext }) {

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Card className='flex justify-center flex-col	 items-center p-4'>
      <Typography color="text.secondary" variant='h5' sx={{ my: 1 }} gutterBottom>
        Step 1 : Prepare The Message
      </Typography>

      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Tabs
            value={selectedTab}
            onChange={(event, newValue) => setSelectedTab(newValue)}
            variant="fullWidth"
            aria-label="basic tabs example"
            sx={{ my: 1 }}
          >
            <Tab
              icon={<EmailIcon />}
              label="Email"
              aria-label="Email Tab"
            />
            <Tab
              icon={<SmsIcon />}
              label="SMS"
              aria-label="SMS Tab"
            />
          </Tabs>
          <TextField placeholder='Subject' required  id='subject' fullWidth sx={{my:2}}/>
          <TextEditor />
        </Box>

      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={handleNext}>
          Next
        </Button>

      </CardActions>
    </Card>
  );
}

function Step2({ handleNext, handleRecipientSelection, handlePrev }) {
  return (
    <Card className='flex justify-center flex-col	 items-center p-16' style={{ position: 'relative' }}>
      <ArrowBackIosIcon style={{ position: 'absolute', top: 0, left: 0, margin: '16px', zIndex: 1,color: "#767575" , cursor:"pointer" }} onClick={handlePrev} />
      <Typography color="text.secondary" variant='h5' sx={{ my: 1 }} gutterBottom>
        Step 2 : Choose Recipients
      </Typography>

      <CardContent>
        <Box className="flex my-4">
          <Typography color="text.secondary" variant='h6' sx={{ m: 2 }} gutterBottom>
            To which group would you like to send this message :
          </Typography>
          <Button style={{backgroundColor: "#eee",  color: "##fff" }} endIcon={<PeopleIcon />}>Show Recipients (0)  </Button>

        </Box>


        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Groups</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Groups"
          >
            <MenuItem value={10}>All </MenuItem>
            <MenuItem value={10}>Group 1 </MenuItem>
            <MenuItem value={20}>Group 2</MenuItem>
            <MenuItem value={30}>Group 3</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={handleNext}>
          Next
        </Button>
      </CardActions>
    </Card>
  );
}

function Step3({ handleSend, handlePrev }) {
  return (
    <Card className='flex justify-center flex-col	 items-center p-16' style={{ position: 'relative' }}>
      <ArrowBackIosIcon style={{ position: 'absolute', top: 0, left: 0, margin: '16px', zIndex: 1,color: "#767575" , cursor:"pointer"}} onClick={handlePrev} />
      <Typography color="text.secondary" variant='h5' sx={{ my: 1 }} gutterBottom>
        Step 3 : Confirm and send
      </Typography>

      <CardContent>
        <Typography variant='h6'>
          Message is ready to be sent
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" endIcon={<PeopleIcon />} color="primary" onClick={() => { }}>
          Send to selected members  
        </Button>
        <Button style={{
        backgroundColor: "#ccc",
        color: "#000"
    }} endIcon={<ScheduleIcon/>} onClick={() => { }}>
          Send Later 
        </Button>
      </CardActions>
    </Card>
  );
}

function Communication() {
  const [step, setStep] = useState(1);
  // const [editorState, setEditorState] = useState(
  //   EditorState.createWithContent(ContentState.createFromText('')) 
  // );
  const [recipients, setRecipients] = useState([]);

  // const handleEditorStateChange = (newEditorState) => {
  //   setEditorState(newEditorState);
  // };

  const handleRecipientSelection = (selectedRecipients) => {
    setRecipients(selectedRecipients);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };
  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const handleSend = () => {
    // Implement sending email and SMS logic here
    // You can use the editorState and recipients state to send messages
  };

  return (
    <Box className='flex justify-center items-center' >
      {step === 1 && (
        <Step1
          handleNext={handleNext}
        />
      )}
      {step === 2 && (
        <Step2
          handleNext={handleNext}
          handlePrev={handlePrev}
          handleRecipientSelection={handleRecipientSelection}
        />
      )}
      {step === 3 && <Step3 handlePrev={handlePrev} handleSend={handleSend} />}
    </Box>
  );
}

export default Communication;
