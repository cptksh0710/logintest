import {
    Box,
    Button,
    Card,
    Grid,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon, Typography
  } from '@mui/material';
  import { Search as SearchIcon } from '../../icons/search';
  import { UserAdd as AddIcon } from '../../icons/user-add';
  import { User as UserIcon } from '../../icons/user';
  import { XCircle as XIcon } from '../../icons/x-circle';
  
  
  export const MemberListToolbar = (props) => (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 3 }}
          variant="h4"
        >
          회원정보 검색
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            startIcon={(<AddIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            등록하기
          </Button>
          <Button
            startIcon={(<UserIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            세부정보
          </Button>
          <Button
            startIcon={(<XIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            삭제하기
          </Button>
          <Button
            color="primary"
            variant="contained"
          >
            선택 승인
          </Button>
        </Box>
      </Box>
      <Box sx={{ ml: 1 }}>
        <Card>
          <CardContent>
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1
            }}
          >
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        color="action"
                        fontSize="small"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
              />
              <Button variant="contained" sx={{ ml: 1 }} >Search</Button>
            </Box>
  
          </CardContent>
   
        </Card> 
      </Box>
    </Box>
  );