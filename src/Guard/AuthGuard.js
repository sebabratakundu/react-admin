import Cookies from 'universal-cookie';
import {Navigate, Outlet} from "react-router-dom";
import axios from "axios";
import {useAsync} from "react-async";

axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

const verifyToken = async ({token}) => {
	try {
		const response = await axios({
			method: "GET",
			url: `/verify-token/${token}`
		});

		return response;
	}
	catch (e) {
		throw new Error(e);
	}
}

const AuthGuard = () => {
	const cookie = new Cookies();
	const authToken = cookie.get('authToken');

	const {data, error} = useAsync({
		promiseFn: verifyToken,
		token: authToken
	});
	if (error) {
		return <Navigate to="/signin"/>
	}

	if (data) {
		sessionStorage.setItem('userInfo', JSON.stringify(data.data.data.data));
		return <Outlet/>
	}

	return null;
}

export default AuthGuard;