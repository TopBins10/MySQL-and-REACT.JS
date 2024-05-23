// src/components/Sidebar.js
import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DataArrayIcon from '@mui/icons-material/TableView'; // This icon can vary depending on what you feel is appropriate
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Typography variant="h6" sx={{ my: 2, ml: 2 }}>
        MySQL project
      </Typography>
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/data">
          <ListItemIcon>
            <DataArrayIcon />
          </ListItemIcon>
          <ListItemText primary="Raw Data" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
