import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './ProtectedRoutes'
import Orders from './pages/Orders'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Categories from './pages/Categories'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Pets from './pages/Pets'
import Users from './pages/Users'

function App() {

  return (
    <BrowserRouter>
              <Routes>
                <Route element={<ProtectedRoute redirectPath="/login" />}>
                  <Route path="/" element={<Dashboard />}/>
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/pets" element={<Pets />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
                <Route path="/" element={<Navigate to="/login"/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            {/* </div> */}
          {/* </div> */}
        </BrowserRouter>
  )
}

export default App
