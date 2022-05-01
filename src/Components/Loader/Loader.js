import {CircularProgress, Stack} from "@mui/material";

const Loader = () => {
	return (
		<>
			<Stack justifyContent="center" alignItems="center" minHeight={'100vh'}>
				<CircularProgress />
			</Stack>
		</>
	)
}

export default Loader;