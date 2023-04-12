import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import imagePlaceholder from 'assets/images/placeholder01.png';
import GlobalDrawer from 'components/Common/Drawer';
import NewKnowledgeBase from 'components/KnowledgeBase';

import {
  Card,
  Grid,
  Typography,
  Link,
  styled,
  Box,
  CardActions,
  CardContent,
  CardMedia,
} from '@mui/material';

const StyledTypographyH5 = styled(Typography)`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: #29125f;
  text-decoration: none;
`;

const StyledTypographyDescription = styled(Typography)`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #535353;
  text-decoration: none;
`;

const StyledTypographyClock = styled(Typography)`
  align-items: center;
  display: flex;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #535353;
  text-decoration: none;

  & .MuiSvgIcon-root {
    margin-right: 5px;
  }
`;

const CardActionsStyled = styled(CardActions)`
  padding: 0px 16px 16px;
`;

const AddText = styled(Typography)`
  align-items: center;
  display: flex;
  color: #f22076;
  font-size: 16px;
  font-family: 'Karla';
  font-weight: 700;
  cursor: pointer;
`;

export default function ListCards() {
  const [open, setOpen] = useState(false);
  function handleClick() {
    setOpen((prev) => !prev);
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <Typography
              sx={{
                color: '#323338',
                fontSize: '18px',
                fontFamily: 'Karla',
                fontWeight: '700',
              }}
            >
              Featured Article
            </Typography>
            <AddText onClick={handleClick}>
              Add <AddIcon />{' '}
            </AddText>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Link sx={{ textDecoration: 'none' }} href="/knowledge-base/details">
            <Card sx={{ maxWidth: '100%' }}>
              <CardMedia
                component="img"
                alt="sample"
                height="140"
                image={imagePlaceholder}
              />
              <CardContent>
                <StyledTypographyH5 gutterBottom variant="h5">
                  Product, Support and Troubleshooting
                </StyledTypographyH5>
                <StyledTypographyDescription>
                  How to check if Youtube campaign is already published
                </StyledTypographyDescription>
              </CardContent>
              <CardActionsStyled>
                <StyledTypographyClock>
                  <AccessTimeIcon /> 09Mar2022 02:34:26
                </StyledTypographyClock>
              </CardActionsStyled>
            </Card>
          </Link>
        </Grid>
      </Grid>
      <GlobalDrawer
        content={<NewKnowledgeBase />}
        disableEnforceFocus
        transitionDuration={{ enter: 300, exit: 400 }}
        name="new-ticket"
        width={700}
        isOpen={open}
        anchor="right"
        BackdropProps={{
          invisible: false,
          sx: { backgroundColor: '#1a1627a3' },
        }}
        hideBackdrop={false}
        onClose={handleClick}
      />
    </Box>
  );
}
