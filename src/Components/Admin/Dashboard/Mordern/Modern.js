import {Grid} from "@mui/material";
import Congratulation from "./Congratulation/Congratulation";
import Purchase from "./Purchase/Purchase";
import Earning from "./Earning/Earning";
import Revenue from "./Revenue/Revenue";

const Modern = () => {
  return (
	  <>
		  <Grid container spacing={5}>
			  <Congratulation/>
			  <Purchase/>
			  <Earning/>
			  <Revenue/>
		  </Grid>
	  </>
  )
}

export default Modern;