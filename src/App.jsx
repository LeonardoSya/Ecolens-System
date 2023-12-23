import { Route, Routes} from 'react-router-dom';
import Homepage from './pages/home/homepage.tsx';
import Services from './pages/services/services.tsx';
import './assets/styles/App.css'
import './assets/styles/index.css'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/services/*' element={<Services />} />
    </Routes>
  )
}
export default App;