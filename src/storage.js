import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import signupReducer from "./Components/Signup/signup.reducer";
import loginReducer from "./Components/Login/login.reducer";
import forgotReducer from "./Components/ForgotPassword/forgot.reducer";
import revenueReducer from "./Components/Admin/Dashboard/Mordern/Revenue/revenue.reducer";
import noteReducer from "./Components/Admin/Apps/Note/note.reducer";
import adminReducer from "./Components/Admin/admin.reducer";

const middlewares = applyMiddleware(
	thunk
);

const root = combineReducers({signupReducer, loginReducer, forgotReducer, revenueReducer, noteReducer, adminReducer});

export const storage = createStore(root, {}, middlewares);