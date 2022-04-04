import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, useState } from "react";
import axios from 'axios';

function Login() {
  const [inputId, setInputId] = useState('')
  const [inputPass, setInputPass] = useState('')

  const handleInputId = (e) => {
    setInputId(e.target.value)
  }

  const handleInputPass = (e) => {
    setInputPass(e.target.value)
  }

  const onClickLogin = () => {
    console.log('click login')
    console.log('ID : ', inputId)
    console.log('Pass : ', inputPass)
    axios.post('/src/components/logininform', null, {
      params: {
        'user_id' : inputId,
        'user_pw' : inputPass
      }
    })
    .then(res => {
      console.log(res)
      console.log('res.data.userId :: ', res.data.userId)
      console.log('res.data.msg :: ', res.data.msg)
      if(res.data.userId === undefined){
          // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          console.log('======================',res.data.msg)
          alert('입력하신 id 가 일치하지 않습니다.')
      } else if(res.data.userId === null){
          // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
          console.log('======================','입력하신 비밀번호 가 일치하지 않습니다.')
          alert('입력하신 비밀번호 가 일치하지 않습니다.')
      } else if(res.data.userId === inputId) {
          // id, pw 모두 일치 userId = userId1, msg = undefined
          console.log('======================','로그인 성공')
          sessionStorage.setItem('user_id', inputId)
      }
      // 작업 완료 되면 페이지 이동(새로고침)
      document.location.href = '/'
    })
    .catch()
  }

  useEffect(() => {
    axios.get('/src/components/logininform')
    .then(res => console.log(res))
    .catch()
  },[])

  const router = useRouter();
  const logo = {
    mainlogo: '/static/images/avatars/login_logo.png',
  };
  const formik = useFormik({
    initialValues: {
      userId: '',
      password: ''
    },
    validationSchema: Yup.object({
      userId: Yup
        .string()
        .max(255)
        .required(
          'ID를 입력하세요'),
      password: Yup
        .string()
        .max(255)
        .required(
          '비밀번호를 입력하세요')
    }),
    onSubmit: () => {
      router.push('/');
    }

  });

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink>
          <Grid align='center'>
            <Avatar
              src={logo.mainlogo}
              sx={{
                height: 64,
                mb: 2,
                width: 64
              }}
            />
          </Grid>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              
              <Typography
                align="center"
                color="textPrimary"
                variant="h4"
              >
                HISEOUL ML CONSOLE
              </Typography>
              <Typography
                align="center"
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                로그인 화면 입니다
              </Typography>
            </Box>
            
            <TextField
              error={Boolean(formik.touched.userId && formik.errors.userId)}
              fullWidth
              helperText={formik.touched.userId && formik.errors.userId}
              label="User ID"
              margin="normal"
              name="userId"
              onBlur={formik.handleBlur}
              onChange={handleInputId}
              type="userId"
              value={inputId}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={handleInputPass}
              type="password"
              value={inputPass}
              variant="outlined"
            />

            <Typography>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx = {{mt:1, mb:2}}
                >
                  <Button
                    color="info"
                    fullWidth
                    onClick={formik.handleSubmit}
                    size="large"
                    variant="contained"
                  >
                    로그인
                  </Button>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  sx = {{mt:1, mb:2}}
                >
                  <Button
                    fullWidth
                    color="error"
                    //onClick={formik.handleChange}
                    size="large"
                    variant="contained"
                    href="/register"
                  >
                    회원 가입
                  </Button>
                </Grid>
              </Grid>
            </Typography>


            <Typography>
              <Grid container>
                <Grid item xs>
                  <NextLink
                    href="/findid"
                  >
                    <Link
                      variant="subtitle2"
                      underline="hover"
                      sx={{
                        cursor: 'pointer'
                      }}
                    >
                      아이디 찾기
                    </Link>
                  </NextLink>
                </Grid>
                <Grid item>
                  <NextLink
                    href="/findpass"
                  >
                    <Link
                      variant="subtitle2"
                      underline="hover"
                      sx={{
                        cursor: 'pointer'
                      }}
                    >
                      비밀번호 찾기
                    </Link>
                  </NextLink>
                </Grid>
              </Grid>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
