import {useState, lazy, Suspense} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'material-icons/iconfont/material-icons.css';
import {createTheme, Paper, ThemeProvider} from "@mui/material";
import {cyan, deepOrange, deepPurple, lightBlue, pink, teal} from "@mui/material/colors";
import {ToastContainer} from "react-toastify";
import "@fontsource/poppins/500.css";
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from "react-redux";
import {storage} from "./storage";
import "./App.css";
import Loader from "./Components/Loader/Loader";

const Signup = lazy(() => import('./Components/Signup/Signup'));
const Login = lazy(() => import('./Components/Login/Login'));
const AdminLayout = lazy(() => import('./Components/Admin/Admin.layout'));
const NotFound = lazy(() => import('./Components/NotFound/NotFound'));
const AuthGuard = lazy(() => import('./Guard/AuthGuard'));
const ForgotPassword = lazy(() => import('./Components/ForgotPassword/ForgotPassword'));
const Modern = lazy(() => import('./Components/Admin/Dashboard/Mordern/Modern'));
const Calendar = lazy(() => import('./Components/Admin/Apps/Calendar/Calendar'));
const Note = lazy(() => import('./Components/Admin/Apps/Note/Note'));


const App = () => {
    const [themeMode, setThemeMode] = useState('light');

    storage.subscribe(() => {
        const { adminReducer } = storage.getState();

        return adminReducer.dark ? setThemeMode('dark') : setThemeMode('light');
    });

    const astechTheme = createTheme({
        palette: {
            mode: themeMode,
            primary: deepPurple,
            secondary: teal,
            success: cyan,
            warning: deepOrange,
            error: pink,
            info: lightBlue
        },
        typography: {
            fontFamily: "Poppins"
        }
    });

    return (
      <>
          <Provider store={storage}>
              <ThemeProvider theme={astechTheme}>
                  <Paper sx={{minHeight: '100vh'}}>
                      <BrowserRouter>
                          <Routes>
                              <Route path="/" element={
                                  <Suspense fallback={<Loader/>}>
                                      <Signup/>
                                  </Suspense>
                              }/>
                              <Route path="signin" element={
                                  <Suspense fallback={<Loader/>}>
                                      <Login/>
                                  </Suspense>
                              }/>
                              <Route element={
                                  <Suspense fallback={<Loader/>}>
                                      <AuthGuard/>
                                  </Suspense>
                              }>
                                  <Route path="admin" element={
                                      <Suspense fallback={<Loader/>}>
                                          <AdminLayout/>
                                      </Suspense>
                                  }>
                                      <Route path="dashboard/modern" element={
                                          <Suspense fallback={<Loader/>}>
                                              <Modern/>
                                          </Suspense>
                                      } />
                                      <Route path="apps/calendar" element={
                                          <Suspense fallback={<Loader/>}>
                                              <Calendar/>
                                          </Suspense>
                                      } />
                                      <Route path="apps/note" element={
                                          <Suspense fallback={<Loader/>}>
                                              <Note/>
                                          </Suspense>
                                      } />
                                      <Route path="*" element={
                                          <Suspense fallback={<Loader/>}>
                                              <NotFound/>
                                          </Suspense>
                                      }/>
                                  </Route>
                              </Route>
                              <Route path="/forgot-password" element={
                                  <Suspense fallback={<Loader/>}>
                                      <ForgotPassword/>
                                  </Suspense>
                              }/>
                              <Route path="*" element={
                                  <Suspense fallback={<Loader/>}>
                                      <NotFound/>
                                  </Suspense>
                              }/>
                          </Routes>
                          <ToastContainer
                              position="bottom-right"
                              autoClose={2000}
                              hideProgressBar={false}
                              newestOnTop={false}
                              closeOnClick
                              rtl={false}
                              pauseOnFocusLoss
                              draggable
                              pauseOnHover
                          />
                      </BrowserRouter>
                  </Paper>
              </ThemeProvider>
          </Provider>
      </>
  )
}

export default App;