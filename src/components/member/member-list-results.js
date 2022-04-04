import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Button,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import axios from 'axios';

export const MemberListResults = ({ members, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);


  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = members.map((member) => member.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === members.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < members.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  NO
                </TableCell>
                <TableCell>
                  WriteDate
                </TableCell>
                <TableCell>
                  PERM
                </TableCell>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  NAME
                </TableCell>
                <TableCell>
                  EMAIL
                </TableCell>
                <TableCell>
                  INSTANCE
                </TableCell>
                <TableCell>
                  ACTIVE
                </TableCell>
                <TableCell>
                  AUTH
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.slice(0, limit).map((member) => (
                <TableRow
                  hover
                  key={member.id}
                  selected={selectedCustomerIds.indexOf(member.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(member.id) !== -1}
                      onChange={(event) => handleSelectOne(event, member.id)}
                      value="true"
                    />
                  </TableCell>
                  

                  <TableCell>
                    {member.no}
                  </TableCell>
                  <TableCell>
                    {member.writedate}
                  </TableCell>
                  <TableCell>
                    {member.permission}
                  </TableCell>
                  <TableCell>
                    {member.id}
                  </TableCell>
                  <TableCell >
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {member.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {member.email}
                  </TableCell>
                  <TableCell>
                    {member.instanceyn}
                  </TableCell>
                  <TableCell>
                    {member.activeyn}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'row'
                        }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                        sx={{ ml: 1 }}
                      >
                        {member.auth}
                      </Typography>
                    </Box>  
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={members.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

MemberListResults.propTypes = {
  members: PropTypes.array.isRequired
};