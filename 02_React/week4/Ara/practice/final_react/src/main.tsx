import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import "./css/index.css";
import { tokenApi } from "./api/auth.tsx";
import { useAuthStore } from "./stores/useAuthStore.tsx";
import { ErrorBoundary } from "react-error-boundary";

const refreshUser = async () => {
  try {
    const { data, status } = await tokenApi();
    if (status === 200) {
      useAuthStore.setState({
        user: data.user,
        accessToken: data.accessToken,
      });
    } else {
      throw new Error("Faild to refesh user");
    }
  } catch {
    useAuthStore.setState({ user: null, accessToken: null });
  }
};

const storage = JSON.parse(sessionStorage.getItem("auth-storage") || "{}");
if (storage?.state?.user) {
  refreshUser();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
