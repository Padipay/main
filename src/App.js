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
function App() {
  return (
   <>
   <TransferContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/send" element={<SendAmount />} />
          <Route path="/details" element={<RecepientDetails/>}/>
          <Route path="/review" element={<ReviewTransaction/>}/>
          <Route path="/complete" element={<CompleteTransaction />} />
          <Route path="/account" element={<CreateAccount />} />
          <Route path="/verify" element={<VerifyAccount />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/resetpassword" element={<NewPassword />} />
          <Route path="/dashboard" element={<PrivateRoute> <Dashboard/> </PrivateRoute>} />
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
