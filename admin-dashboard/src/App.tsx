import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import ShopList from "./pages/ShopList";
import ShopEditor from "./pages/ShopEditor";
import CollectionList from "./pages/CollectionList";
import CollectionEditor from "./pages/CollectionEditor";
import OrderList from "./pages/OrderList";
import OrderDetail from "./pages/OrderDetail";
import CustomerList from "./pages/CustomerList";
import EnquiryList from "./pages/EnquiryList";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="stoneaura-admin-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            {/* Shop Routes */}
            <Route path="shop" element={<ShopList />} />
            <Route path="shop/new" element={<ShopEditor />} />
            <Route path="shop/edit/:id" element={<ShopEditor />} />

            {/* Collection Routes */}
            <Route path="collections" element={<CollectionList />} />
            <Route path="collections/new" element={<CollectionEditor />} />
            <Route path="collections/edit/:id" element={<CollectionEditor />} />

            {/* Order Routes */}
            <Route path="orders" element={<OrderList />} />
            <Route path="orders/:id" element={<OrderDetail />} />

            {/* Customer Routes */}
            <Route path="customers" element={<CustomerList />} />

            {/* Enquiry Routes */}
            <Route path="enquiries" element={<EnquiryList />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
