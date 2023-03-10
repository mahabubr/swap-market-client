import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import route from './Router/route';
import './App.css';

function App() {
  return (
    <div>
      <RouterProvider router={route} />
      <Toaster />
    </div>
  );
}

export default App;
