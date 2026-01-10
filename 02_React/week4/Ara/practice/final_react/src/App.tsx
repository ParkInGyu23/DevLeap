import { Navigate, Route, Routes } from "react-router";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Write from "./pages/Write";
import Read from "./pages/Read";
import UnAuthenticatedLayout from "./layout/UnAuthenticatedLayout";
import AuthenticatedLayout from "./layout/AuthenticatedLayout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route element={<UnAuthenticatedLayout />}>
            <Route path="/auth" element={<Auth />} />
          </Route>
          <Route element={<AuthenticatedLayout />}>
            <Route path="/write" element={<Write />} />
          </Route>
          <Route path="/read/:id" element={<Read />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
