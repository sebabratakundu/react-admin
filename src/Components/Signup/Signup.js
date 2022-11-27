import {
	Button,
	Container,
	Grid,
	Stack,
	TextField,
	FormGroup,
	FormControlLabel, Checkbox, Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import Cookies from "universal-cookie";
import {useDispatch, useSelector} from "react-redux";
import {signupRequest} from "./signup.action";
import {LoadingButton} from "@mui/lab";
import {SIGNUP_RESET} from "./signup.state";

const Signup = () => {
	const signupForm = {
		fullname: '',
		email: '',
		mobile: '',
		password: ''
	}
	const signupFormError = {
		fullname: {
			state: false,
			message: ''
		},
		email: {
			state: false,
			message: ''
		},
		mobile: {
			state: false,
			message: ''
		},
		password: {
			state: false,
			message: ''
		}
	}

	const [input, setInput] = useState(signupForm);
	const [error, setError] = useState(signupFormError);
	const [isChecked, setChecked] = useState(false);
	const dispatch = useDispatch();
	const {signupReducer} = useSelector(res => res);
	const cookie = new Cookies();

	useEffect(() => {
		const checkSignup = () => {
			if (signupReducer && signupReducer.isLoading) {
			} else if (signupReducer && signupReducer.data) {
				toast.success('Register Success!');
				cookie.set('authToken', signupReducer.data.token, {maxAge: 24 * 60 * 60});
			} else if (signupReducer && signupReducer.error) {
				toast.error(signupReducer.error);
			}
		}

		checkSignup();

		return () => dispatch({type: SIGNUP_RESET});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [signupReducer])

	const setInputValue = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		setInput(old => {
			return {...old, [key]: value};
		});
	}

	const fullNameValidation = (e) => {
		const name = e.target.name;
		const isFieldRequired = checkRequiredField(e);

		setError((oldError) => {
			return {
				...oldError,
				[name]: isFieldRequired
			}
		});
	}

	const emailValidation = (e) => {
		const name = e.target.name;
		const isFieldRequired = checkRequiredField(e);
		const isEmail = checkEmail(e.target.value);

		setError((oldError) => {
			return {
				...oldError,
				[name]: (isFieldRequired.state && isFieldRequired) || isEmail
			}
		});
	}

	const mobileValidation = (e) => {
		const name = e.target.name;
		const isFieldRequired = checkRequiredField(e);
		const minLength = checkMinLength(e.target.value, 4);
		const maxLength = checkMaxLength(e.target.value, 13);

		setError((oldError) => {
			return {
				...oldError,
				[name]: (isFieldRequired.state && isFieldRequired) || (minLength.state && minLength) || maxLength
			}
		});
	}

	const passwordValidation = (e) => {
		const name = e.target.name;
		const isFieldRequired = checkRequiredField(e);
		const minLength = checkMinLength(e.target.value, 8);
		const maxLength = checkMaxLength(e.target.value, 15);
		const password = checkPassword(e.target.value);

		setError((oldError) => {
			return {
				...oldError,
				[name]: (isFieldRequired.state && isFieldRequired) ||
				(password.state && password) ||
				(minLength.state && minLength) ||
				maxLength
			}
		});
	}

	const checkRequiredField = (e) => {
		if (e.target.value.trim().length) {
			return {
				state: false,
				message: ''
			};
		} else {
			return {
				state: true,
				message: 'This field is required!'
			}
		}
	}

	const checkEmail = (email) => {
		const emailRegEx = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g;

		if (!emailRegEx.test(email)) {
			return {
				state: true,
				message: 'your email is not a valid email'
			}
		}

		return {
			state: false,
			message: ''
		};
	}

	const checkMinLength = (value, length) => {
		if (value.length < length) {
			return {
				state: true,
				message: `minimum ${length} character required`
			}
		}

		return {
			state: false,
			message: ''
		}
	}

	const checkMaxLength = (value, length) => {
		if (value.length > length) {
			return {
				state: true,
				message: `maximum ${length} character allowed`
			}
		}

		return {
			state: false,
			message: ''
		}
	}

	const checkPassword = (password) => {
		const passwordRegEx = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=)/g;

		if (!passwordRegEx.test(password)) {
			return {
				state: true,
				message: 'Password should contain capital letter, small letter, number, symbol'
			}
		}

		return {
			state: false,
			message: ''
		}
	}

	const validateFormOnSubmit = () => {
		let valid = true;

		for (const key in input) {
			if (input[key].length === 0) {
				setError((oldError) => {
					return {
						...oldError,
						[key]: {
							state: true,
							message: 'This field is required!'
						}
					}
				});

				valid = false;
			}
		}

		return valid;
	}

	const signup = (e) => {
		e.preventDefault();
		const isValid = validateFormOnSubmit();

		if (isValid) {
			dispatch(signupRequest(input));
		}
	}

	return (
		<>
			<Container>
				<Grid container py={5} spacing={8}>
					<Grid item md={6} xs={12}>
						<img src="images/auth.svg" alt="auth" width="100%"/>
					</Grid>
					<Grid item md={6} xs={12}>
						<Typography variant="h3" mb={5}>Register</Typography>
						<form onSubmit={signup}>
							<Stack spacing={5}>
								<TextField
									type="text"
									variant="outlined"
									label="Name"
									color="primary"
									name="fullname"
									error={error.fullname.state}
									helperText={error.fullname.message}
									value={input.fullname}
									onChange={setInputValue}
									onBlur={fullNameValidation}
									onInput={fullNameValidation}
								/>
								<TextField
									type="email"
									variant="outlined"
									label="Email"
									color="primary"
									name="email"
									autoComplete="email"
									error={error.email.state}
									helperText={error.email.message}
									value={input.email}
									onChange={setInputValue}
									onBlur={emailValidation}
									onInput={emailValidation}
								/>
								<TextField
									type="number"
									variant="outlined"
									label="Mobile"
									color="primary"
									name="mobile"
									error={error.mobile.state}
									helperText={error.mobile.message}
									value={input.mobile}
									onChange={setInputValue}
									onBlur={mobileValidation}
									onInput={mobileValidation}
								/>
								<TextField
									type="password"
									variant="outlined"
									label="Password"
									color="primary"
									name="password"
									autoComplete="current-password"
									error={error.password.state}
									helperText={error.password.message}
									value={input.password}
									onChange={setInputValue}
									onBlur={passwordValidation}
									onInput={passwordValidation}
								/>

								<Stack direction="row" justifyContent="space-between">
									<FormGroup>
										<FormControlLabel
											control={<Checkbox checked={isChecked} onChange={() => setChecked(!isChecked)}/>}
											label="I accept terms & condition"
										/>
									</FormGroup>
									<Button type="button" color="primary" size="large" component={Link} to="/signin">already
										have an account</Button>
								</Stack>
								<div>
									<LoadingButton
										loading={signupReducer && signupReducer.isLoading}
										type="submit"
										variant="contained"
										sx={{py: 1, px: 5}}
										disabled={
											error.fullname.state ||
											error.email.state ||
											error.mobile.state ||
											error.password.state ||
											!isChecked
										}
									>
										Signup
									</LoadingButton>
								</div>
							</Stack>
						</form>
					</Grid>
				</Grid>
			</Container>
		</>
	)
}

export default Signup;