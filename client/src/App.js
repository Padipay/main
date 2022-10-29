import SendAmount from './components /transaction/sendAmount';
import RecepientDetails from './components /transaction/recepientDetails';
import ReviewTransaction from './components /transaction/reviewTransaction';
import CompleteTransaction from './components /transaction/completeTransaction';
import SuccessfulTransaction from './components /transaction/SuccessfulTransaction';
import PaymentDetails from './components /transaction/paymentDetails';

import Homepage from './components /Homepage/homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CreateAccount from './components /authentication/createAccount';
import VerifyAccount from './components /authentication/verifyAccount';
import Login from './components /authentication/login';
import ResetPassword from './components /authentication/resetPassword'
import NewPassword from './components /authentication/newPassword';
import CreatePassword from './components /authentication/createPassword';
import VerifyEmail from './components /authentication/verifyEmail';
import ResendVerificationEmail from './components /authentication/resendVerificationEmail';

import PrivateRoute from './components /CustomRoutes/PrivateRoute';
import RefreshRoute from './components /CustomRoutes/RefreshRoute';
import RegisterRoutes from './components /CustomRoutes/RegisterRoutes';
import VerifyRoutes from './components /CustomRoutes/VerifyRoutes';


import NotFound from './components /Layouts/NotFound';


import AdminRegister from './admin/components/adminRegisteration';


import Settings from './components /Dashboard/settings';
import Dashboard from './components /Dashboard/Dashboard';
import Transactions from './components /Dashboard/Transactions';

import Action from './components /Layouts/action';
import Admin from './admin/admin';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import TimeOutModal from './components /Layouts/timeoutModal';




function App() {
  const { payment_status } = useSelector(state => state.transfer_details)
  const clearStorage = () => {
    setTimeout(() => {
      sessionStorage.clear()
    }, 480000);
  }

  useEffect(() => {
      clearStorage()
  },[])

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
          <Route path="/verify" element={<VerifyRoutes> <VerifyAccount /> </VerifyRoutes>} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/resend-email" element={<VerifyRoutes> <ResendVerificationEmail /> </VerifyRoutes>} />
          <Route path="/action" element={<Action />} />
          <Route path="/resetpassword" element={<NewPassword />} />

          <Route path="/dashboard" element={<PrivateRoute> <Dashboard/> </PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute> <Settings/> </PrivateRoute>} />
          <Route path="/transactions" element={<PrivateRoute> <Transactions/> </PrivateRoute>} />

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
