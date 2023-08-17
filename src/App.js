import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import StorageOptions from "./pages/StorageOptions"
import MintingOptions from "./pages/MintingOptions"
import About from "./pages/AboutUs"
import PersonalizeRecomendation from "./pages/PersonalizeRecomendation"
import Contactus from "./pages/Contactus"
import Dashboard from './pages/Dashboard';
import ArEnable from "./pages/ArEnabled"
import Valuation from "./pages/Valuation"
import Subscription from "./pages/Subscription"
import Upload1 from "./pages/Upload-1"
import Upload2 from "./pages/Upload2"
import Faq from "./pages/Faq"
import ProfileONSales from "./pages/ProfileOnSales"
import Activity from "./pages/Activity"
import Search from "./pages/Search"
import Notfound from './components/Notfound';
import Item from './pages/ItemOnsale';
import Item2 from './pages/item2';
import EditProfile from './pages/EditProfile';
import Profile2 from './pages/Profile2';
import Redeem from './pages/Redeem';
import Connectwallet from './pages/Connectwallet';
import Connectwallet2 from './pages/connectWallet2';
import Connectwallet3 from './pages/Connectwallet3';
import CreateCollection from "./pages/CreateCollection"
import PageLinks from './pages/PageLinks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
// import { loadUser } from './actions/userActions';
import ProfileCreated from "./pages/ProfilleCreated"
import ProfileLikes from "./pages/ProfileLikes"
import ProfileCollectibles from "./pages/ProfileCollectibles"
import PrivateRouter from './pages/PrivateRouter';
import Notifications from './pages/Notifications';
// import Test from "./pages/test";
import PaymentPage from './pages/paymentPage';
import Discover from './pages/Discover';
import Web3 from "web3";
import StorageListing from "./pages/StorageListing"
import Transactions from './pages/Transactions';
import ScrollToTop from './ScrollToTop';
const web3 = new Web3(Web3.givenProvider);
 function App() {
  let dispatch = useDispatch()

  const consoleWarn = console.warn;
const SUPPRESSED_WARNINGS = ['arning text - I will n'];

console.warn = function filterWarnings(msg, ...args) {
    if (!SUPPRESSED_WARNINGS.some((entry) => msg.includes(entry))) {
        consoleWarn(msg, ...args);
    }
};
// Scroll to top if path changes
  const [accountBal,setAccountBal] = useState()
  const [account,setAccount] = useState(null)

useEffect(() => {
  window.scrollTo(0, 0);
}, []);
const { user } = useSelector((state) => state);

 
const getAccountBal = async () => {
  
  if (user && user.user && user.user.address) {
    let address = user && user.user && user.user.address;
    let balance = await web3.eth.getBalance(address);
    balance = web3.utils.fromWei(balance).toString();
    setAccountBal(Number(balance));
    return balance;
  }
  
};
useEffect(()=>{
  getAccountBal();
})

  useEffect(()=>{
  account &&  getAccountBal()
  },[account])
  return (
    <>
    
     <BrowserRouter>
    
  <ToastContainer/>
    <Header accountbal={accountBal}/>
    
      <main>
        <Routes>
          <Route exact path={'/'} element={<Home/>} />
          <Route exact path={'/notification'} element={<Notifications/>} />
          <Route exact path={'/discover'} element={<Discover />} />
          <Route exact path={'/login'} element={<Login/>} />
          <Route exact path={'/register'} element={<Register/>} />
          <Route exact path={'/storage-options'} element={<StorageOptions/>} />
          <Route exact path={'/storage-listing'} element={<StorageListing/>} />
          <Route exact path={'/minting-options'} element={<MintingOptions/>} />
          <Route exact path={'/profile/collectibles'} element={<ProfileCollectibles/>} />
          <Route exact path={'/aboutus'} element={<About/>} />
          <Route exact path={'/create-collection'} element={<CreateCollection/> } />
          <Route exact path={'/personalize-recomendation'} element={<PersonalizeRecomendation/>} />
          <Route exact path={'/contactus'} element={<Contactus/>} />
          <Route exact path={'/dashboard'} element={<Dashboard/>} />
          <Route exact path={'/ar-enabled'} element={<ArEnable/>} />
          <Route exact path={'/valuation'} element={<Valuation/>} />
          <Route exact path={'/subscription'} element={<Subscription/>} />
          {/* <Route exact path={'/test'} element={<Test/>} /> */}
          <Route exact path={'/payment'} element={<PaymentPage/>} />
          <Route exact path={'/upload-1'} element={
          <PrivateRouter>
            <Upload1/>
            </PrivateRouter>} />
          <Route exact path={'/upload-2'} element={<Upload2/>} />
          <Route exact path={'/faq'} element={<Faq/>} />
          <Route exact path={'/profile'} element={
          <ProfileONSales/>
          } />
            <Route exact path={'/profile/created'} element={
          <ProfileCreated/>
          } />
           <Route exact path={'/profile/likes'} element={
          <ProfileLikes/>
          } />
          <Route exact path={'/activity'} element={<Activity/>} />
          <Route exact path={'/search'} element={<Search/>} />
          <Route exact path={'/not-found'} element={<Notfound/>} />
          <Route exact path={'/item-1/:id/:token/:collectionId'} element={
          <PrivateRouter>
            <Item getAccountBal={getAccountBal}/>
            </PrivateRouter>  } />
          <Route exact path={'/item-2'} element={
          <PrivateRouter>
            <Item2/>
            </PrivateRouter> } />
          <Route exact path={'edit-profile'} element={<EditProfile/>} />
          <Route exact path={'user/:name'} element={<Profile2/>} />
          <Route exact path={'redeem'} element={<Redeem/>} />
          <Route exact path={'connect-wallet'} element={<Connectwallet/>} />
          <Route exact path={'connect-wallet2'} element={<Connectwallet2/>} />
          <Route exact path={'connect-wallet3'} element={<Connectwallet3/>} />
          <Route exact path={'page-links'} element={<PageLinks/>} />
          <Route exact path={'transactions'} element={<Transactions/>} />
        </Routes>
        <ScrollToTop />
        <Footer/>
      
      </main>
    </BrowserRouter>
</>
  );
}

export default App;