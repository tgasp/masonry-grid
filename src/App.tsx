import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Photo from './pages/Photo'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="photo/:id" element={<Photo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
