import DrawerAppBar from "./front/components/appbar/DrawerAppBar";
import AppRoutes from "./front/components/AppRoutes";
import { SidebarProvider } from "./front/components/sidebar/SidebarContext";
import { ThemeWrapper } from "./theme/ThemeWrapper";
import { AuthContextProvider } from "./front/context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <ThemeWrapper>
        <SidebarProvider>
          <DrawerAppBar>
            <AppRoutes />
          </DrawerAppBar>
        </SidebarProvider>
      </ThemeWrapper>
    </AuthContextProvider>
  );
}

export default App;
