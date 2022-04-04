import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container } from '@mui/material';
import { MemberListResults } from '../components/member/member-list-results';
import { MemberListToolbar } from '../components/member/member-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

const Member = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiCall = async () =>  {
      const response = await axios.get('http://localhost:8080/restapi/member'); 
      setData(response.data.payload);
    };
    apiCall();
  }, [])

  console.log(data);
  return (
    <div>
      <>
        <Head>
          <title>
            Members | Byeol_ver
          </title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth={false}>
            <MemberListToolbar />
            <Box sx={{ mt: 3 }}>
              <MemberListResults members={data} />
            </Box>
          </Container>
        </Box>
      </>
    </div>    
  );
};
Member.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Member;