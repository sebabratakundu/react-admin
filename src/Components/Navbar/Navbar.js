import {Button, Container, Menu, Stack} from "@mui/material";
import menus from "../../json-api/menu.json";
import {Link} from "react-router-dom";

const MenuLink = ({menu}) => {
	return (
		<Button variant="contained" color="primary">
			<Link to={menu.link}>{menu.label}</Link>
		</Button>
	)
}

const Navbar = () => {
  return (
	  <>
		  <Stack sx={{backgroundColor: 'secondary.light'}} py={2}>
			  <Container>
				  <Stack direction={{
					  xs: "column",
					  sm: "row"
				  }} justifyContent="space-between" spacing={2}>
					  <Button variant="outlined" color="success">AS TECH</Button>
					  <Stack direction={{
						  xs: "column",
						  sm: "row"
					  }} spacing={3}>
						  {
							  menus.map((menu, index) => <MenuLink menu={menu} key={index} />)
						  }
					  </Stack>
				  </Stack>
			  </Container>
		  </Stack>
	  </>
  )
}

export default Navbar;