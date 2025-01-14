import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Azkar from './pages/Azkar';
import Radio from './pages/Radio';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/azkar" element={<Azkar />} />
          <Route path="/radio" element={<Radio />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
