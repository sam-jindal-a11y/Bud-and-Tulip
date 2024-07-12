import { useEffect } from 'react';
import './App.css';
import Layout from './Layout';

function App() {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
