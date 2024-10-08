import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//import { Provider } from 'react-redux'
//import store from './redux/store'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/Register';
import Record from './pages/Record';
import Home from './pages/Home';
import OperationForm from './pages/OperationForm';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className='font-sans text-base bg-slate-100 min-w-min'>
        <Router>
        <Navbar/>
          <Routes>
              <Route exact path="/" element={<Home/>}>
              </Route>
              <Route exact path="/register" element={<Register/>}>
              </Route>
              <Route exact path="/record" element={<Record/>}>
              </Route>
              <Route exact path="/execute-operation" element={<OperationForm/>}>
              </Route>
          </Routes>
        <Footer/>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
