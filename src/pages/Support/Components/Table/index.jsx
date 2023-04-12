import React from 'react';

import _ from 'lodash';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import {
  Paper,
  Grid,
  Typography,
  Divider,
  styled,
  Tooltip,
  Chip,
  Stack,
  Box,
} from '@mui/material';
import { formatDate } from 'utils/date';

const StyledTypography = styled(Typography)`
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StyledPaper = styled(Paper)`
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
`;

export default function Table({
  tickets,
  hover,
  setHover,
  tableHeader,
  onSelectRow,
}) {
  return (
    <StyledPaper>
      <Grid container sx={{ padding: '0.5em 1em' }}>
        {tableHeader?.map((data, index) => (
          <Grid item xs={data?.size} key={index}>
            <StyledTypography color="#707575" variant="button" fontWeight={800}>
              {data?.name}
            </StyledTypography>
          </Grid>
        ))}
      </Grid>
      <Divider />
      {_.isEmpty(tickets?.data) ? (
        <Box my={2} sx={{ textAlign: 'center' }}>
          <Typography variant="span" sx={{ color: 'black' }}>
            No Results Found!
          </Typography>
        </Box>
      ) : (
        tickets?.data?.map((ticket, index) => (
          <Grid
            container
            sx={{
              padding: '0.5em 1em',
              borderBottom: '1px solid #ececec75',
              boxShadow:
                hover === index && 'rgb(0 0 0 / 45%) 0px 23px 8px -22px',
            }}
            key={index}
            spacing={1}
            onMouseOver={() => setHover(index)}
            onMouseOut={() => setHover(null)}
          >
            {tableHeader?.map((data, index) => {
              switch (data?.name?.toLowerCase()) {
                case 'subject':
                  return (
                    <Grid item xs={data?.size} key={index}>
                      <Tooltip title={ticket[data?.key] ?? '-'} arrow>
                        <StyledTypography
                          color="#707575"
                          // component={Link}
                          // to={{
                          //   pathname: `https://ad-weave.io/crm/forms/tickets/${ticket?.ticketkey}`,
                          // }}
                          onClick={() => onSelectRow(ticket)}
                          target="_blank"
                          sx={{
                            textDecoration: 'none',
                            ':hover': {
                              color: '#F22076',
                            },
                          }}
                        >
                          {ticket[data?.key]}
                        </StyledTypography>
                      </Tooltip>
                    </Grid>
                  );
                case 'last reply':
                case 'created':
                  return (
                    <Grid item xs={data?.size} key={index}>
                      <Tooltip
                        title={formatDate(
                          ticket[data?.key] ?? '-',
                          'ddd, MMM DD hh:mm a'
                        )}
                        arrow
                      >
                        <StyledTypography color="#707575">
                          {formatDate(
                            ticket[data?.key] ?? '-',
                            'ddd, MMM DD hh:mm a'
                          )}
                        </StyledTypography>
                      </Tooltip>
                    </Grid>
                  );

                case 'tags':
                  return (
                    <Grid
                      item
                      xs={data?.size}
                      key={index}
                      sx={{ overflow: 'hidden' }}
                    >
                      <Stack direction="row" spacing={1}>
                        {_.isEmpty(ticket[data?.key])
                          ? '-'
                          : ticket[data?.key]?.map((tag) => (
                              <Chip
                                size="small"
                                key={tag?.id}
                                label={tag?.name}
                                sx={{ borderRadius: '3px' }}
                              />
                            ))}
                      </Stack>
                    </Grid>
                  );
                default:
                  return (
                    <Grid item xs={data?.size} key={index}>
                      <Tooltip title={ticket[data?.key] ?? '-'} arrow>
                        <StyledTypography color="#707575">
                          {ticket[data?.key] ?? '-'}
                        </StyledTypography>
                      </Tooltip>
                    </Grid>
                  );
              }
            })}
          </Grid>
        ))
      )}
    </StyledPaper>
  );
}

Table.propTypes = {
  tickets: PropTypes.any,
  hover: PropTypes.any,
  setHover: PropTypes.func,
  tableHeader: PropTypes.array,
  onSelectRow: PropTypes.any,
};
