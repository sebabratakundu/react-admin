import {
	Button,
	Checkbox,
	Container, FormControl,
	FormControlLabel,
	FormGroup, FormHelperText,
	Grid, IconButton, InputAdornment, InputLabel, OutlinedInput,
	Stack,
	TextField,
	Typography
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as yup from "yup";
import {loginRequest} from "./login.action";
import Cookies from "universal-cookie";

const Login = () => {
	const loginForm = {
		username: '',
		password: ''
	}
	const loginFormError = {
		username: {
			state: false,
			message: ''
		},
		password: {
			state: false,
			message: ''
		}
	}
	const schema = yup.object().shape({
		username: yup.string().required().email(),
		password: yup.string().required()
	});

	const cookie = new Cookies();
	const navigate = useNavigate();
	const [input, setInput] = useState(loginForm);
	const [error, setError] = useState(loginFormError);
	const [isChecked, setChecked] = useState(false);
	const [isDisabled, setDisabled] = useState(true);
	const [inputType, setInputType] = useState('password');
	const dispatch = useDispatch();
	const {loginReducer} = useSelector(res => res);

	useEffect(() => {

		const checkLogin = () => {
			if (loginReducer.isUserNotFound) {
				setError(() => {
					return {
						username: {
							state: true,
							message: loginReducer.error
						},
						password: {
							state: false,
							message: ''
						}
					}
				});
			} else if (loginReducer.isIncorrectPassword) {
				setError(() => {
					return {
						username: {
							state: false,
							message: ''
						},
						password: {
							state: true,
							message: loginReducer.error
						}
					}
				});
			} else if (loginReducer.isLoggedIn) {
				cookie.set('authToken', loginReducer.data.token, {maxAge: 60 * 60 * 24});
				navigate('/admin');
			}
		}

		const checkRememberMe = () => {
			const userCred = localStorage.getItem('userCred');
			if (userCred != null) {
				setInput(JSON.parse(userCred));
				setChecked(true);
				setDisabled(false);
			}
		};

		checkLogin();
		checkRememberMe();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loginReducer]);

	const setInputValue = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		setInput(old => {
			return {...old, [key]: value};
		});
	}

	const login = (e) => {
		e.preventDefault();

		localStorage.removeItem('userCred');

		if (isChecked) {
			const userCred = JSON.stringify(input);
			localStorage.setItem('userCred', userCred);
		}

		dispatch(loginRequest(input));
	}

	const validateSubmit = async () => {
		const isValid = await schema.isValid(input);
		setDisabled(!isValid);
	}

	const validateInput = async (e) => {
		const key = e.target.name;

		try {
			await schema.validateAt(key, input);
			setError((old) => {
				return {
					...old,
					[key]: {
						state: false,
						message: ''
					}
				}
			})
		}
		catch (e) {
			setError((old) => {
				return {
					...old,
					[key]: {
						state: true,
						message: e.message
					}
				}
			})
		}
	};

	const togglePassword = () => {
		inputType === 'password' ? setInputType('text') : setInputType('password');
	};

	return (
		<>
			<Container>
				<Grid container py={5} spacing={8}>
					<Grid item md={6} xs={12}>
						<img src="images/auth.svg" alt="auth" width="100%"/>
					</Grid>
					<Grid item md={6} xs={12}>
						<Typography variant="h3" mb={5}>Login</Typography>
						<form onSubmit={login}>
							<Stack spacing={5}>
								<TextField
									type="email"
									variant="outlined"
									label="Email"
									color="primary"
									name="username"
									error={error.username.state}
									helperText={error.username.message}
									value={input.username}
									onChange={setInputValue}
									onKeyDown={validateSubmit}
									onInput={validateInput}
								/>
								<FormControl variant="outlined">
									<InputLabel htmlFor="password">Password</InputLabel>
									<OutlinedInput
										type={inputType}
										color="primary"
										name="password"
										id="password"
										label="Password"
										autoComplete="password"
										error={error.password.state}
										value={input.password}
										onChange={setInputValue}
										onKeyDown={validateSubmit}
										onInput={validateInput}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													onClick={togglePassword}
													edge="end"
												>
												<span className="material-icons-outlined">
													{ inputType === 'password' ? 'visibility_off' : 'visibility' }
												</span>
												</IconButton>
											</InputAdornment>
										}
									/>
									<FormHelperText error={error.password.state} className="text-danger">{error.password.message}</FormHelperText>
								</FormControl>

								<Stack direction="row" justifyContent="space-between">
									<FormGroup>
										<FormControlLabel
											control={<Checkbox checked={isChecked} onChange={() => setChecked(!isChecked)}/>}
											label="Remember Password"
										/>
									</FormGroup>
									<Button type="button" color="primary" size="large" component={Link} to="/">Don't have an account? Signup</Button>
								</Stack>
								<Stack direction="row" justifyContent="space-between">
									<LoadingButton
										loading={loginReducer && loginReducer.isLoading}
										type="submit"
										variant="contained"
										sx={{py: 1, px: 5}}
										disabled={isDisabled}
									>
										Login
									</LoadingButton>
									<Button type="button" color="error" size="large" component={Link} to="/forgot-password">Forgot Password</Button>
								</Stack>
							</Stack>
						</form>
					</Grid>
				</Grid>
			</Container>
		</>
	)
}

export default Login;