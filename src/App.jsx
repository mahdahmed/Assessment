import { BrowserRouter, Routes, Route } from "react-router-dom";


import DefaultLayout from "./layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<DefaultLayout />}>
    
        </Route>  
      </Routes>
    </BrowserRouter>
  );
}

export default App;