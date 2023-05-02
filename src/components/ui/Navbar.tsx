import { Mail, Notifications, Pets } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  Button
} from "@mui/material";
import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import * as API from "@/helpers/api"

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
const Navbar = () => {
  const token = ""
  let [isSportsman, setIsSportsman] = useState(false)
  let [isAdmin, setIsAdmin] = useState(false)
  let [isRepresentative, setIsRepresentative] = useState(false)
  let [isPartner, setIsPartner] = useState(false)

  const [open, setOpen] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        location.href = "/signin"
      }
      const me = await API.me(token);
      if (me.roles.includes("sportsman")) {
        setIsSportsman(true)
      }
      if (me.roles.includes("admin")) {
        setIsAdmin(true)
      }
      if (me.roles.includes("representative")) {
        setIsRepresentative(true)
      }
      if (me.roles.includes("partner")) {
        setIsPartner(true)
      }
    })();
    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  // const handleToEvents = () => {
  //   router.push('/events')
  // }
  // const handleToUsers = () => {
  //   router.push('/users')
  // }
  // const handleToProfile = () => {
  //   router.push('/profile')
  // }
  // const handleToBids = () => {
  //   router.push('/bids')
  // }
  // const handleToFeedbacks = () => {
  //   router.push('/feedbacks')
  // }
  // const handleToCreateBid = () => {
  //   router.push('/create_bid')
  // }
  // const handleToAllNotify = () => {
  //   router.push('/all_notify')
  // }
  return (
    <AppBar position="sticky" sx={{background: "#FFFFFF"}}>
      <StyledToolbar> 
      <img width={100} src="logo.png" alt="Picture of the author" />
        <Box sx={{display: 'flex', alignItems: 'center',  gap: '7px'}}>
          
        {/* <Search>
          <InputBase placeholder="search..." />
        </Search> */}
          <a href="/events"><Button sx={{height: '30px', width: 'auto', boxShadow: 'none', borderRadius: '15px', textTransform: 'none', background: '#F3EFFB', color: '#574BCC', '&:hover': {background: '#574BCC', color: '#F3EFFB'}}} fullWidth variant="contained" color="primary">Мероприятия</Button></a>
          <a href="/users"><Button sx={{height: '30px', width: 'auto', boxShadow: 'none', borderRadius: '15px', textTransform: 'none', background: '#F3EFFB', color: '#574BCC', '&:hover': {background: '#574BCC', color: '#F3EFFB'}}} fullWidth variant="contained" color="primary">Пользователи</Button></a>
          {
            isAdmin ? <a href="/all_notify"><Button sx={{height: '30px', width: 'auto', boxShadow: 'none', borderRadius: '15px', textTransform: 'none', background: '#F3EFFB', color: '#574BCC', '&:hover': {background: '#574BCC', color: '#F3EFFB'}}} fullWidth variant="contained" color="primary">Рассылка</Button></a> : <></>
          },
          {
            isAdmin ? <a href="/bids"><Button sx={{height: '30px', width: 'auto', boxShadow: 'none', borderRadius: '15px', textTransform: 'none', background: '#F3EFFB', color: '#574BCC', '&:hover': {background: '#574BCC', color: '#F3EFFB'}}} fullWidth variant="contained" color="primary">Заявки на мероприятия</Button></a> : <></>
          }
          {
            isAdmin ? <a href="/feedbacks"><Button sx={{height: '30px', width: 'auto', boxShadow: 'none', borderRadius: '15px', textTransform: 'none', background: '#F3EFFB', color: '#574BCC', '&:hover': {background: '#574BCC', color: '#F3EFFB'}}} fullWidth variant="contained" color="primary">Отзывы</Button></a> : <></>
          }
          {
            (isRepresentative || isPartner) ? <a href="create_bid"><Button sx={{height: '30px', width: 'auto', boxShadow: 'none', borderRadius: '15px', textTransform: 'none', background: '#F3EFFB', color: '#574BCC', '&:hover': {background: '#574BCC', color: '#F3EFFB'}}} fullWidth variant="contained" color="primary">Подать заявку</Button></a> : <></>
          }
        </Box>
        <Box sx={{display: 'flex', gap: '4px', alignItems: 'center'}}>
          <Typography sx={{color: 'black'}}>Роль: {isSportsman ? "Спортсмен" : isAdmin? "Администратор" : isRepresentative ? "Представитель" : isPartner ? "Партнёр" : ""}</Typography>
          <a href='/profile'><Button sx={{height: '30px', width: 'auto', boxShadow: 'none', borderRadius: '15px', textTransform: 'none', background: '#F3EFFB', color: '#574BCC', '&:hover': {background: '#574BCC', color: '#F3EFFB'}}} fullWidth variant="contained" color="primary">Профиль</Button></a>
          <Button onClick={() => {localStorage.removeItem('token'); location.href = "/signin"}} sx={{height: '30px', width: 'auto', boxShadow: 'none', borderRadius: '15px', textTransform: 'none', background: '#F3EFFB', color: '#574BCC', '&:hover': {background: '#574BCC', color: '#F3EFFB'}}} fullWidth variant="contained" color="primary">Выйти</Button>
        </Box>  
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
