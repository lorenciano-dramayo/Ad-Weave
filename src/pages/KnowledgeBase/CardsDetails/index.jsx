import React, { useRef } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
// Components
import Header from 'pages/KnowledgeBase/Components/Header';
import { Editor } from '@tinymce/tinymce-react';
import {
  Stack,
  Box,
  Typography,
  Divider,
  styled,
  Grid,
  Breadcrumbs,
  Link,
  Chip,
  Button,
} from '@mui/material';

const TypographyTitleGroup = styled(Typography)`
  padding-bottom: 12px;
  padding-top: 15px;
  font-family: 'Karla';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #29125f;
`;

const TypographySubTitle = styled(Typography)`
  font-family: 'Karla';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #535353;
  padding: 20px 0px;
`;

const TypographyMainTitle = styled(Typography)`
  font-family: Karla;
  font-style: normal;
  font-weight: 400;
  font-size: 26px;
  line-height: 30px;
  color: #000000;
  margin-top: 25px;
`;

const TypographyRelated = styled(Typography)`
  font-family: 'Karla';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  margin-bottom: 15px;
`;

const TypographyRelatedClock = styled(Typography)`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #535353;
  margin-bottom: 15px;
`;

const ChipStyled = styled(Chip)`
  border: 1px solid #29125f;
  border-radius: 10px;

  & .MuiChip-label {
    color: #29125f;
    font-family: 'Karla';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 20px;
  }
`;
const GridIndex = styled(Grid)`
  z-index: -1;
`;

const StackStyledRelated = styled(Stack)`
  margin-top: 15px;
  & h6 {
    font-family: 'Karla';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 12px;
    color: #29125f;
  }
  & span {
    font-family: 'Karla';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;

    color: #323338;
  }
`;

const DividerStyle = styled(Divider)(() => ({
  borderColor: 'rgba(83, 83, 83, 0.2)',
}));

export default function KnowledgeBase() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <Stack>
      <Header />

      <Box>
        <Box ml={3} mr={3} mb={3}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              sx={{
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                fontSize: '12px',
                fontFamily: 'Karla',
                fontWeight: '400',
              }}
              underline="hover"
              color="inherit"
              href="/knowledge-base"
            >
              Portal Home <KeyboardArrowRightIcon />
            </Link>
          </Breadcrumbs>
          <Grid container spacing={3}>
            <GridIndex item xs={12}>
              <TypographyMainTitle variant="h5">
                How to check if Youtube campaign is already published
              </TypographyMainTitle>
            </GridIndex>
            <Grid item xs={7} sx={{ paddingRight: '25px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Typography variant="p">
                  <AccessTimeIcon /> 09Mar2022 02:34:26
                </Typography>
              </Box>
              <TypographyTitleGroup>Group</TypographyTitleGroup>
              <DividerStyle />
              <TypographySubTitle variant="h6">
                Product, Support and Troubleshooting
              </TypographySubTitle>
              <TypographyTitleGroup variant="h6">
                Article Description
              </TypographyTitleGroup>
              <Editor
                apiKey="ete4lgqtbj1e2pnldnq9d6d8qnphjgcy9rw4phddizgfqe7z"
                initialValue="<p></p>"
                init={{
                  plugins: 'link image code fullscreen preview',
                  toolbar:
                    'undo redo | bold italic | alignleft aligncenter alignright | code ',
                  branding: false,
                }}
                onChange={log}
              />
              <Button
                variant="contained"
                color="error"
                sx={{ marginTop: '10px' }}
              >
                Delete
              </Button>
            </Grid>
            <Grid item xs={5}>
              <TypographyRelated variant="h5">Tags</TypographyRelated>
              <DividerStyle />
              <Stack sx={{ marginTop: '10px' }} direction="row" spacing={1}>
                <ChipStyled label="Support" variant="outlined" />
                <ChipStyled label="Support" variant="outlined" />
              </Stack>
              <TypographyRelated sx={{ marginTop: '25px' }} variant="h5">
                Related Articles
              </TypographyRelated>
              <DividerStyle />
              <StackStyledRelated>
                <Typography variant="h6">API Integration</Typography>
                <Typography variant="p">Ad-Lib Support</Typography>
              </StackStyledRelated>

              <TypographyRelatedClock sx={{ marginTop: '25px' }} variant="h5">
                <AccessTimeIcon /> 09Mar2022 02:34:26
              </TypographyRelatedClock>
              <DividerStyle />
              <StackStyledRelated>
                <Typography variant="h6">API Integration</Typography>
                <Typography variant="p">
                  YouTube Reporting Requirements
                </Typography>
              </StackStyledRelated>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
}
