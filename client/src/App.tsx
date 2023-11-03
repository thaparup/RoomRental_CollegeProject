import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./components/Auth/Authentication";
// import { TopHeader } from "./components/Navbar/TopHeader";
import { ForgotPassword } from "./components/Auth/ForgotPassword";
import { Error404 } from "./components/PageError/Error404";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useState } from "react";
// import LoadingBar from "react-top-loading-bar";
import { Notifications } from "@mantine/notifications";
import HomePage from "./components/Home/HomePage";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Paper,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { Footer } from "./components/Navbar/Footer";
import { TopHeader } from "./components/Navbar/TopHeader";
import Listing from "./pages/Listing";
import Layout from "./components/Layout";
import UpdateProperty from "./pages/UpdateProperty";
import House from "./pages/House/House";
import Room from "./pages/Room/Room";
import Hostel from "./pages/Hostel";
import Land from "./pages/Land/Land";
import Flat from "./pages/Flat";
import PrivateRoute from "./utils/PrivateRoute";
import About from "./components/About/About";
import RoomDetailPage from "./pages/Room/RoomDetailPage";
import AddRoom from "./pages/Room/AddRoom";
import FileUploadForm from "./pages/FileUploadForm";
import UpdateRoom from "./pages/Room/UpdateRoom";
import AddLand from "./pages/Land/AddLand";
import LandDetailPage from "./pages/Land/LandDetailPage";
import SuperAdmin from "./pages/SuperAdmin";
import HouseDetailPage from "./pages/House/HouseDetailPage";
import UpdateHouse from "./pages/House/UpdateHouse";
import AddHouse from "./pages/House/AddHouse";
import UpdateLand from "./pages/Land/UpdateLand";
import Random from "./pages/random";
import Kyc from "./pages/kyc";
import GetKyc from "./pages/GetKyc";
import GetHouseById from "./pages/GetHouseById";
import GetRoomById from "./pages/GetRoomById";
import UpdateProfile from "./pages/UpdateProfile";
import UpdateKyc from "./pages/UpdateKyc";
import ViewKyc from "./pages/Room/ViewKyc";
import Messages from "./pages/Messages";

const queryClient = new QueryClient();

function App() {
  // const [progress, setProgress] = useState(0);
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["d", () => toggleColorScheme()]]);

  if (colorScheme === "dark") {
    document.body.style.backgroundColor = "#1a1b1e";
  } else {
    document.body.style.backgroundColor = "white";
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider
              theme={{ colorScheme: "light", fontFamily: "Poppins" }}
              withGlobalStyles
              withNormalizeCSS
            >
              <Notifications position="top-right" />
              <Paper p="0" radius="0">
                <TopHeader />

                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/auth" element={<Authentication />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/random" element={<Random />} />

                  <Route element={<PrivateRoute />}>
                    <Route path="/admin" element={<SuperAdmin />} />

                    <Route path="/auth/getkyc" element={<GetKyc />} />
                    <Route path="/listing" element={<Listing />} />
                    <Route path="/listing/house" element={<House />} />
                    <Route
                      path="/listing/house/edit/:id"
                      element={<UpdateHouse />}
                    />
                    <Route path="/listing/house/new" element={<AddHouse />} />
                    <Route path="/view/house/:id" element={<GetHouseById />} />

                    <Route path="/listing/land" element={<Land />} />
                    <Route path="/listing/land" element={<AddLand />} />
                    <Route
                      path="/listing/land/:id"
                      element={<LandDetailPage />}
                    />
                    <Route path="/listing/land/new" element={<AddLand />} />
                    <Route
                      path="/listing/land/edit/:id"
                      element={<UpdateLand />}
                    />
                    <Route path="/listing/hostel/:id" element={<Hostel />} />

                    <Route path="/listing/flat" element={<Flat />} />

                    <Route path="/listing/room" element={<Room />} />
                    <Route
                      path="/listing/room/:id"
                      element={<RoomDetailPage />}
                    />
                    <Route path="/listing/room/new" element={<AddRoom />} />
                    <Route
                      path="/listing/room/edit/:id"
                      element={<UpdateRoom />}
                    />
                    <Route path="/listing/house" element={<House />} />
                    <Route
                      path="/listing/house/:id"
                      element={<HouseDetailPage />}
                    />
                    <Route path="/view/room/:id" element={<GetRoomById />} />

                    <Route path="/account/edit" element={<UpdateProfile />} />
                    <Route path="/kyc/edit" element={<UpdateKyc />} />
                    <Route path="/kyc/view" element={<ViewKyc />} />
                    <Route path="/auth/kyc" element={<Kyc />} />

                    <Route path="/messages" element={<Messages />} />
                  </Route>

                  <Route
                    path="/auth/forgot-password"
                    element={<ForgotPassword />}
                  />
                  <Route path="*" element={<Error404 />} />
                  <Route path="/mylisting/edit" element={<UpdateProperty />} />
                </Routes>

                <Footer
                  data={[
                    {
                      title: "About",
                      links: [
                        { label: "Features", link: "#" },
                        { label: "Pricing", link: "#" },
                        { label: "Support", link: "#" },
                        { label: "Forums", link: "#" },
                      ],
                    },
                    {
                      title: "Project",
                      links: [
                        { label: "Contribute", link: "#" },
                        { label: "Media assets", link: "#" },
                        { label: "Changelog", link: "#" },
                        { label: "Releases", link: "#" },
                      ],
                    },
                    {
                      title: "Community",
                      links: [
                        { label: "Join Discord", link: "#" },
                        { label: "Follow on Twitter", link: "#" },
                        { label: "Email newsletter", link: "#" },
                        { label: "GitHub discussions", link: "#" },
                      ],
                    },
                  ]}
                />
              </Paper>
            </MantineProvider>
          </ColorSchemeProvider>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
