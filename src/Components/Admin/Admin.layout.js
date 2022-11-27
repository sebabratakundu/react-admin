import {Link, Outlet, useResolvedPath, useMatch, useLocation, useNavigate} from "react-router-dom";
import {
	AppBar, Avatar,
	Box, Breadcrumbs, Collapse, Divider,
	Drawer, FormControlLabel, FormGroup,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText, ListSubheader, Menu, MenuItem, Stack, Switch,
	Toolbar, Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import menus from './../../json-api/admin.menu.json';
import MediaQuery from "react-responsive";
import {Logout, PersonAdd, Settings} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {logoutRequest} from "../Login/login.action";

const MenuList = ({menu}) => {
  return (
	  <List subheader={<ListSubheader>{menu.category}</ListSubheader>}>
		  {
			  menu.menus.map((submenu, index) => <MenuNav key={index} menu={submenu}/>)
		  }
	  </List>
  )
}

const DropdownMenu = ({dropdown, collapse}) => {
  return (
	  <Collapse sx={{ml: 3}} in={collapse} timeout="auto" unmountOnExit>
		 <List>
			 {
				 dropdown.map((menu, index) => <MenuNav key={index} menu={menu}/>)
			 }
		 </List>
	  </Collapse>
  )
}

const MenuNav = ({menu}) => {
	const [collapse, setCollapse] = useState(false);
	const routes = useResolvedPath(menu.link ?? false);
	const activeLink = useMatch(routes.pathname);

  return (
	  <>
		  <ListItem sx={{py: 0}}>
			  <ListItemButton
				  onClick={() => menu.isDropdown ? setCollapse(!collapse) : false}
				  component={menu.isDropdown ? ListItemButton : Link}
				  to={menu.link ?? undefined}
				  sx={{
					  bgcolor: menu.link && activeLink ? 'primary.main' : null,
					  color: menu.link && activeLink ? 'white' : null,
					  '&:hover': {
						  color: menu.link && activeLink ? 'black' : null
					  }
				  }}
			  >
				  <ListItemIcon
					  sx={{
						  color: menu.link && activeLink ? 'white' : null,
					  }}
				  >
					  <span className="material-icons-outlined">{menu.icon}</span>
				  </ListItemIcon>
				  <ListItemText primary={menu.label} />
				  {
					  menu.isDropdown ? <span className="material-icons-outlined">expand_more</span> : null
				  }
			  </ListItemButton>
		  </ListItem>
		  {
			  menu.isDropdown ? <DropdownMenu dropdown={menu.dropdown} collapse={collapse} /> : null
		  }
	  </>
  )
}

function BreadcrumbLink({breadcrumb}) {
	return (
		<Link className="text-decoration-none" to={breadcrumb.location !== 'admin' ? breadcrumb.location : false}>
			<Typography textTransform="capitalize" color={breadcrumb.length === breadcrumb.index ? 'error' : 'primary'}>{breadcrumb.location}</Typography>
		</Link>
	)
}

const AdminLayout = () => {
	const [active, setActive] = useState(true);
	const [mobileActive, setMobileActive] = useState(false);
	const [user, setUser] = useState(null);
	const [width, setWidth] = useState(250);
	const [anchor, setAnchor] = useState(null);
	const [mode, setMode] = useState('Light');
	const currentLocation = useLocation().pathname.split('/').filter(location => location);
	const open = Boolean(anchor);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {loginReducer, adminReducer} = useSelector(res => res);


	const checkUser = () => {
		if (loginReducer.isLoggedOut) {
			navigate('/signin');
			dispatch({type: 'light'});
		} else if (loginReducer.isLoggedIn) {
			navigate('/admin/dashboard/modern');
		}
	};

	useEffect(() => {
		checkUser();
	}, [loginReducer]);

	if (!user) {
		return setUser(JSON.parse(sessionStorage.getItem('userInfo')));
	}

	const handleDrawer = () => {
	  setActive(!active);
	  active ? setWidth(0) : setWidth(250);
	};

	const handleMobileDrawer = () => {
	  setMobileActive(!mobileActive);
	  mobileActive ? setWidth(0) : setWidth(250);
	}

	const handleMenu = (e) => {
	  setAnchor(e.currentTarget);
	}

	const handleMenuClose = () => {
	  setAnchor(null);
	}

	const logout = () => {
		dispatch(logoutRequest());
	};

	const DesktopDrawer = () => {
		return (
			<Drawer variant="persistent" open={active} anchor="left" sx={{
				width,
				"& .MuiDrawer-paper": {
					width
				}
			}}>
				<Box>
					<List sx={{mt: 1}} subheader={<ListSubheader>AS TECH</ListSubheader>}/>
					{
						menus.map((menu, index) => <MenuList key={index} menu={menu} />)
					}
				</Box>
			</Drawer>
		)
	}

	const MobileDrawer = () => {
		return (
			<Drawer
				variant="temporary"
				open={mobileActive}
				anchor="left"
				onClick={handleMobileDrawer}
				onClose={handleMobileDrawer}
				sx={{
				width,
				"& .MuiDrawer-paper": {
					width
				}
			}}>
				<Box>
					<List sx={{mt: 1}} subheader={<ListSubheader>AS TECH</ListSubheader>}/>
					{
						menus.map((menu, index) => <MenuList key={index} menu={menu} />)
					}
				</Box>
			</Drawer>
		)
	}

	const setDarkMode = (e) => {
		const isChecked = e.currentTarget.checked;

		if (isChecked) {
			dispatch({type: 'dark'});

			return setMode('Dark');
		}

		dispatch({type: 'light'});

		return setMode('Light');
	};

	return (
	  <>
		  <Stack>
			  <MediaQuery minWidth={1024}>
				  <DesktopDrawer/>
			  </MediaQuery>
			  <MediaQuery maxWidth={1023}>
				  <MobileDrawer/>
			  </MediaQuery>
			  <AppBar
				  color="primary"
				  elevation={0}
				  sx={{
					  width: {
						  xs: '100%',
						  md: `calc(100% - ${width}px)`
					  },
					  transition: '0.1s ease-out',
				  }}
			  >
				  <Stack direction="row" justifyContent="space-between">
					  <Toolbar>
						  <MediaQuery minWidth={1024}>
							  <IconButton color="inherit" onClick={handleDrawer}>
								  <span className="material-icons-outlined">menu</span>
							  </IconButton>
						  </MediaQuery>
						  <MediaQuery maxWidth={1023}>
							  <IconButton color="inherit" onClick={handleMobileDrawer}>
								  <span className="material-icons-outlined">menu</span>
							  </IconButton>
						  </MediaQuery>
					  </Toolbar>
					  <Toolbar>
						  <Stack direction="row" alignItems="center" spacing={3} mr={5}>
							  <FormGroup>
								  <FormControlLabel control={<Switch onChange={setDarkMode} color="error"/>} label={mode}/>
							  </FormGroup>
							  <IconButton color="inherit">
								  <span className="material-icons-outlined">shopping_basket</span>
							  </IconButton>
							  <IconButton color="inherit">
								  <span className="material-icons-outlined">mail</span>
							  </IconButton>
							  <IconButton color="inherit">
								  <span className="material-icons-outlined">notifications</span>
							  </IconButton>
							  <IconButton onClick={handleMenu}>
								  <Avatar src="https://mui.com/static/images/avatar/1.jpg" />
							  </IconButton>
							  <Menu
								  open={open}
								  anchorEl={anchor}
								  onClose={handleMenuClose}
								  PaperProps={{
									  elevation: 0,
									  sx: {
										  overflow: 'visible',
										  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
										  mt: 1.5,
										  '& .MuiAvatar-root': {
											  width: 32,
											  height: 32,
											  ml: -0.5,
											  mr: 1,
										  },
										  '&:before': {
											  content: '""',
											  display: 'block',
											  position: 'absolute',
											  top: 0,
											  right: 14,
											  width: 10,
											  height: 10,
											  bgcolor: 'background.paper',
											  transform: 'translateY(-50%) rotate(45deg)',
											  zIndex: 0,
										  },
									  },
								  }}
								  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
								  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
							  >
								  <MenuItem>{user.name}</MenuItem>
								  <MenuItem>
									  <Typography fontSize="small" fontStyle="italic" color="primary">{user.email}</Typography>
								  </MenuItem>
								  <Divider/>
								  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
								  <MenuItem onClick={handleMenuClose}>My Transactions</MenuItem>
								  <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
								  <Divider />
								  <MenuItem>
									  <ListItemIcon>
										  <PersonAdd fontSize="small" />
									  </ListItemIcon>
									  Add another account
								  </MenuItem>
								  <MenuItem>
									  <ListItemIcon>
										  <Settings fontSize="small" />
									  </ListItemIcon>
									  Settings
								  </MenuItem>
								  <MenuItem onClick={logout}>
									  <ListItemIcon>
										  <Logout fontSize="small" />
									  </ListItemIcon>
									  Logout
								  </MenuItem>
							  </Menu>
						  </Stack>
					  </Toolbar>
				  </Stack>
			  </AppBar>
			  <Box sx={{
				  minHeight: '100vh',
				  ml: {
					  md: `${width}px`
				  },
				  pt: 10,
				  px: 4,
				  transition: '0.1s ease-out',
				  bgcolor : adminReducer.dark ? 'inherit' : '#f5f5f5'
			  }}>
				  <Breadcrumbs area-label="breadcrumb">
					  {
						  currentLocation.map((location, index) => <BreadcrumbLink key={index} breadcrumb={{location, index, length: currentLocation.length - 1}} />)
					  }
				  </Breadcrumbs>
				  <div className="py-5">
					  <Outlet/>
				  </div>
			  </Box>
		  </Stack>
	  </>
  )
}

export default AdminLayout;