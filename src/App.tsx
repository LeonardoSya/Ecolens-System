import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Homepage from './pages/home/homepage.tsx';
import Services from './pages/services/services.tsx';
// import Spotlight from './pages/services/Christmas/index.tsx';
import './assets/styles/App.css'
import './assets/styles/index.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/services/*' element={<Services />} />
        {/* <Route path='/spotlight' element={<Spotlight />} /> */}
      </Routes>
    </BrowserRouter>

  )
}
export default App;
