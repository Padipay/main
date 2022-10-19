import SendAmount from './components /sendAmount';
import RecepientDetails from './components /recepientDetails';
import ReviewTransaction from './components /reviewTransaction';
import CompleteTransaction from './components /completeTransaction';
import Homepage from './components /homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAccount from './components /createAccount';
import VerifyAccount from './components /verifyAccount';
import Login from './components /login';
import ResetPassword from './components /resetPassword';
import NewPassword from './components /newPassword';
import Dashboard from './components /Dashboard';
import PrivateRoute from './components /CustomRoutes/PrivateRoute';
import RefreshRoute from './components /CustomRoutes/RefreshRoute';
import VerifyEmail from './components /verifyEmail';
import SuccessfulTransaction from './components /SuccessfulTransaction';
import NotFound from '../src/components /NotFound'
import CreatePassword from './components /createPassword';
import RegisterRoutes from './components /CustomRoutes/RegisterRoutes';
import AdminRegister from './admin/components/adminRegisteration';
import PaymentSuccess from './components /CustomRoutes/PaymentSuccessRoute';
import ResendVerificationEmail from './components /resendVerificationEmail';

import Action from './components /action';
import Admin from './admin/admin';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaymentDetails from './components /paymentDetails';
import TimeOutModal from './components /timeoutModal';

import { fetch_api_rates } from './redux/transfer/actions/actions';



function App() {
  const { payment_status } = useSelector(state => state.transfer_details)
  const dispatch = useDispatch()

  useEffect(() => {
      // dispatch(toggleLoading())
      dispatch(fetch_api_rates())
      const interval = setInterval(() => {
          dispatch(fetch_api_rates())
      }, 7000);
      return () => clearInterval(interval)
  }, [])

  return (
   <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/send" element={<SendAmount />} />
          <Route path="/details" element={<RefreshRoute> <RecepientDetails/> </RefreshRoute>}/>
          <Route path="/review" element={<RefreshRoute>  <ReviewTransaction/> </RefreshRoute>}/>
          <Route path="/complete" element={<RefreshRoute> <CompleteTransaction /> </RefreshRoute>}/>
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/password" element={<RegisterRoutes> <CreatePassword /> </RegisterRoutes>}/>
          <Route path="/success-transact" element={<RefreshRoute> <SuccessfulTransaction /> </RefreshRoute>} />
          <Route path="/verify" element={<VerifyAccount />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/resend-email" element={<ResendVerificationEmail />} />
          <Route path="/action" element={<Action />} />
          <Route path="/resetpassword" element={<NewPassword />} />
          <Route path="/dashboard" element={<PrivateRoute> <Dashboard/> </PrivateRoute>} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <TimeOutModal open={payment_status}/>
        <PaymentDetails open={payment_status}/>
      </Router>
      
   </>
  );
}

export default App;
