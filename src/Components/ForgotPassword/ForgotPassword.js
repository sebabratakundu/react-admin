import {
	Container,
	Grid,
	Stack,
	TextField,
	Typography
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {forgotPasswordRequest, sendVerifyCodeRequest} from "./forgot.action";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const ForgotPassword = () => {
	const [isPasswordForm, setShowPasswordForm] = useState(false);
	const [input, setInput] = useState({
		email: '',
		code: '',
		password: ''
	});
	const [error, setError] = useState({
		email: {
			state: false,
			message: ''
		},
		code: {
			state: false,
			message: ''
		},
		password: {
			state: false,
			message: ''
		}
	});
	const dispatch = useDispatch();
	const {forgotReducer} = useSelector(res => res);
	const navigate = useNavigate();

	useEffect(() => {
		const checkUser = () => {
			if (forgotReducer.emailSent) {
				toast.success(forgotReducer.data.message);
				setShowPasswordForm(true);
				setError(() => {
					return {
						email: {
							state: false,
							message: ''
						},
						code: {
							state: false,
							message: ''
						},
						password: {
							state: false,
							message: ''
						}
					}
				});
			}

			if (forgotReducer.error && forgotReducer.userNotFound) {
				setError((old) => {
					return {
						...old,
						email: {
							state: true,
							message: forgotReducer.error.data.message
						}
					}
				});
			}
		};

		const checkPassword = () => {
			if (forgotReducer.passwordChanged) {
				toast.success(forgotReducer.data.message);
				setError(() => {
					return {
						email: {
							state: false,
							message: ''
						},
						code: {
							state: false,
							message: ''
						},
						password: {
							state: false,
							message: ''
						}
					}
				});

				navigate('/signin');
			}

			if (forgotReducer.error && forgotReducer.codeNotMatched) {
				setError((old) => {
					return {
						...old,
						code: {
							state: true,
							message: forgotReducer.error.data.message
						}
					}
				});
			} else if (forgotReducer.error) {
				toast.error(forgotReducer.error.data.message);
			}
		};

		checkUser();
		checkPassword();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [forgotReducer]);

	const sendCode = (e) => {
		e.preventDefault();

		dispatch(sendVerifyCodeRequest(e.target[0].value));
	};

	const handleInput = (e) => {
		const input = e.target;
		const value = input.value;
		const name = input.name;

		setInput((old) => {
			return {
				...old,
				[name]: value
			}
		})
	};

	const setPassword = (e) => {
		e.preventDefault();
		dispatch(forgotPasswordRequest(input));
	};

	return (
		<>
			<Container>
				<Grid container py={5} spacing={8}>
					<Grid item md={6} xs={12}>
						<img src="images/auth.svg" alt="auth" width="100%"/>
					</Grid>
					<Grid item md={6} xs={12}>
						<Typography variant="h3" mb={5}>Forgot Password</Typography>
						{
							!isPasswordForm ? <form onSubmit={sendCode}>
								<Stack direction="column" spacing={3}>
									<TextField
										error={error.email.state}
										helperText={error.email.message}
										type="email"
										label="Email"
										name="email"
										color="primary"
										value={input.email}
										onChange={handleInput}
									/>
									<div>
										<LoadingButton loading={forgotReducer.isLoading} type="submit" variant="contained" sx={{py: 1}}>Send Verification Code</LoadingButton>
									</div>
								</Stack>
							</form> : <form onSubmit={setPassword}>
								<Stack direction="column" spacing={3}>
									<TextField
										error={error.code.state}
										helperText={error.code.message}
										type="number"
										label="Verification Code"
										name="code"
										value={input.code}
										onChange={handleInput}
									/>
									<TextField
										type="password"
										label="New Password"
										name="password"
										value={input.password}
										onChange={handleInput}
									/>
									<div>
										<LoadingButton loading={forgotReducer.isLoading} type="submit" variant="contained" sx={{py: 1}}>Confirm</LoadingButton>
									</div>
								</Stack>
							</form>
						}
					</Grid>
				</Grid>
			</Container>
		</>
	)
}

export default ForgotPassword;