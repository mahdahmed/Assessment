import { BrowserRouter, Routes, Route } from "react-router-dom";


import DefaultLayout from "./layout";
import { Dashboard } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
        <Route index element={<Dashboard />} />
    
        </Route>  
      </Routes>
    </BrowserRouter>
  );
}

export default App;