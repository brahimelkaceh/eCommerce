import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

const YourTagIcon = ({ color }) => (
  <svg stroke={color} fill={color} strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    {/* Your SVG path here */}
  </svg>
);

const CardItem = ({ avatarColor, title, value, tagColor, tagIcon, tagText, percentage }) => {
  return (
    <Card className="card card-border" role="presentation">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={4}>
            <Avatar sx={{ backgroundColor: `#${avatarColor}`, width: 55, height: 55, minWidth: 55, lineHeight: 55, fontSize: 27.5 }}>
              {tagIcon}
            </Avatar>
            <Box>
              <Typography variant="body1" component="span">{title}</Typography>
              <Typography variant="h3" component="span">{value}</Typography>
            </Box>
          </Box>
          <Box className={`tag gap-1 font-bold border-0 text-${tagColor}`}>
            <span>{tagIcon}</span>
            <span>{percentage}</span>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const CustomerCard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
      <CardItem avatarColor="indigo600" title="Total Customers" value="2,420" tagColor="emerald-600" tagIcon={<YourTagIcon color="#fff" />} percentage="17.2%" />
      <CardItem avatarColor="blue500" title="Active Customers" value="1,897" tagColor="emerald-600" tagIcon={<YourTagIcon color="#fff" />} percentage="32.7%" />
    </div>
  );
};

export default CustomerCard;
