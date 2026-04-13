import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layout";
import { Dashboard, Form, NotFound, ProductListing } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="form" element={<Form />} />
        <Route path="products" element={<ProductListing />} />
        <Route path="users" element={<h1>Users Page</h1>} />
        <Route path="settings" element={<h1>Settings Page</h1>} />



        <Route path="*" element={<NotFound />} />
        </Route>  
      </Routes>
    </BrowserRouter>
  );
}

export default App;