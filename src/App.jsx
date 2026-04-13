import { BrowserRouter, Routes, Route } from "react-router-dom";


import DefaultLayout from "./layout";
import { Dashboard, Form } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="form" element={<Form />} />

    
        </Route>  
      </Routes>
    </BrowserRouter>
  );
}

export default App;