import SendAmount from './components /sendAmount';
import RecepientDetails from './components /recepientDetails';
import ReviewTransaction from './components /reviewTransaction';
import CompleteTransaction from './components /completeTransaction';
import Homepage from './components /hompage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransferContextProvider from './contextApi/TransferContext';
import CreateAccount from './components /createAccount';
import VerifyAccount from './components /verifyAccount';
import Login from './components /login';
import ResetPassword from './components /resetPassword';
import NewPassword from './components /newPassword';
import Dashboard from './components /Dashboard';
import PrivateRoute from './components /PrivateRoute';
import VerifyEmail from './components /verifyEmail';
import SuccessfulTransaction from './components /SuccessfulTransaction';
import Action from './components /action';
import Admin from './admin/admin';
import { useEffect } from 'react';

function App() {
  // const onRefresh = () => {
  //   sessionStorage.clear()
  //   // navigate("/")
  // }
  
  // useEffect(() => {
  //   window.addEventListener("beforeunload", onRefresh());
  //   return () => {
  //     window.removeEventListener("beforeunload", onRefresh());
  //   };
  // }, [])

  useEffect(() => {
    setTimeout(() => {
      sessionStorage.clear()
    }, 600000);
  })
  return (
   <>
   <TransferContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/send" element={<SendAmount />} />
          <Route path="/details" element={<PrivateRoute> <RecepientDetails/> </PrivateRoute>}/>
          <Route path="/review" element={<PrivateRoute>  <ReviewTransaction/> </PrivateRoute>}/>
          <Route path="/complete" element={<PrivateRoute> <CompleteTransaction /> </PrivateRoute>}/>
          <Route path="/account" element={<CreateAccount />} />
          <Route path="/success" element={<SuccessfulTransaction />} />
          <Route path="/verify" element={<VerifyAccount />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/action" element={<Action />} />
          <Route path="/resetpassword" element={<NewPassword />} />
          <Route path="/dashboard" element={<PrivateRoute> <Dashboard/> </PrivateRoute>} />
          <Route path="/admin/*" element={<Admin />} />
          {/* <Route path="/create" element={<PrivateRoute> <CreateArticle/> </PrivateRoute>}/>
          <Route path="/article/:id" element={<PrivateRoute> <ArticleDetails/> </PrivateRoute>}/>
          <Route path="/edit/:id" element={<PrivateRoute> <EditArticle/> </PrivateRoute>}/> */}
        </Routes>
      </Router>
    </TransferContextProvider>
   </>
  );
}

export default App;
