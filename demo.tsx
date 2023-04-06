import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  EmailActivityLogs,
  EmailLogs,
} from './email-logs/email-logs.component';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [emailActivityLogs, setEmailActivityLogsValue] =
    React.useState(emailLogs);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Activity" {...a11yProps(0)} />
          <Tab label="Profile" {...a11yProps(1)} />
          <Tab label="Reminder" {...a11yProps(2)} />
          <Tab label="Email Logs" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {/* Activity */}
        <EmailLogs logs={emailActivityLogs}></EmailLogs>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Profile
      </TabPanel>
      <TabPanel value={value} index={2}>
        Reminder
      </TabPanel>
      <TabPanel value={value} index={3}>
        <EmailLogs logs={emailActivityLogs}></EmailLogs>
      </TabPanel>
    </Box>
  );
}
const emailLogs: EmailActivityLogs[] = [
  {
    isActivity: true,
    title: 'Today',
  },
  {
    subject: 'Discussion of Opportunity',
    body: `Hi There Steve, I'm emailing you today to let you know we have created a new opportunity called avalon 
    In this CE you'll learn how to create an elaborate flow with easy steps`,
    sender: 'Alok Nath',
  },
  {
    subject: 'Rahul Dravid Java Developer',
    body: 'Rahul Dravid Java Developer',
    receiver: 'Mayank A.',
    date: '1 weeek ago',
  },
  {
    subject: 'Discussion of Opportunity',
    body: `Hi There Steve, I'm emailing you today to let you know we have created a new opportunity called avalon 
    In this CE you'll learn how to create an elaborate flow with easy steps`,
    sender: 'Alok Nath',
  },
];
