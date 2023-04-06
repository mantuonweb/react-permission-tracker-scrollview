import {
  Box,
  StepConnector,
  stepConnectorClasses,
  styled,
} from '@mui/material';
import React = require('react');
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
export function EmailLogsIcon(props) {
  return <CircleIcon fontSize="small" color="primary"></CircleIcon>;
}
export function EmailLogsIcon2(props) {
  return <TripOriginIcon color="primary"></TripOriginIcon>;
}
export function getIcon(log: EmailActivityLogs, showCircle?: boolean) {
  return !showCircle ? EmailLogsIcon : EmailLogsIcon2;
}
const StepEmailConnector = styled(StepConnector)(({ theme }) => ({
  [`& .${stepConnectorClasses.line}`]: {},
}));
const StepperEmail = styled(Step)(({ theme }) => ({
  [`& .MuiStepContent-root `]: {
    'margin-left': '9px',
  },
  [`& .MuiStepConnector-root`]: {
    'margin-left': '9px',
  },
  [`& .MuiStep-root:last-child .MuiStepContent-root`]: {
    border: 'none',
  },
}));
export function EmailLogs(props: EmailActiityLogsProps) {
  const { children, logs, ...other } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  console.log(logs);
  return (
    <Box sx={{ maxWidth: '100%' }}>
      <StepperEmail
        activeStep={activeStep}
        nonLinear
        orientation="vertical"
        connector={<StepEmailConnector />}
      >
        {logs.map((log, index) => {
          if (log.subject) {
            return (
              <Step completed="true" key={log.subject} active={true}>
                <StepLabel StepIconComponent={getIcon(log, index === 0)}>
                  {log.subject && log.sender
                    ? `Subject:${log.subject}`
                    : log.date}
                </StepLabel>
                {log.sender && (
                  <StepContent>
                    <Box sx={{ mb: 2 }}>
                      <Typography>{log.body}</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography style={{ display: 'inline-block' }}>
                        Send by
                        <Box
                          fontWeight="fontWeightMedium"
                          display="inline"
                          style={{ marginLeft: '0.4em' }}
                        >
                          {log.sender}
                        </Box>
                      </Typography>
                    </Box>
                  </StepContent>
                )}
                {!log.sender && (
                  <StepContent>
                    <Box sx={{ mb: 2 }}>
                      <Typography>
                        to
                        <Box
                          fontWeight="fontWeightMedium"
                          display="inline"
                          style={{ marginLeft: '0.4em' }}
                        >
                          {log.receiver}
                        </Box>
                        <Box
                          display="inline"
                          style={{ margin: '0 0.4em', color: '#1976d2' }}
                        >
                          <a>sent a mail</a>
                        </Box>
                        {log.body}
                      </Typography>
                    </Box>
                  </StepContent>
                )}
              </Step>
            );
          } else {
            return (
              <Step completed="true" key={log.title} active={true}>
                <StepLabel StepIconComponent={getIcon(log, index === 0)}>
                  {log.title}
                </StepLabel>
                <StepContent>
                  <Box sx={{ mb: 2 }}>
                    <Typography>{log.body}</Typography>
                  </Box>
                </StepContent>
              </Step>
            );
          }
        })}
      </StepperEmail>
    </Box>
  );
}

export interface EmailActivityLogs {
  sender?: string;
  receiver?: string;
  subject?: string;
  body?: string;
  date?: string;
  isActivity?: boolean;
  title?: string;
}

export interface EmailActiityLogsProps {
  children?: React.ReactNode;
  logs: EmailActivityLogs[];
}
