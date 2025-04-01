import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login-page";
import RoomPage from "./pages/room-page";
import ChatPage from "./pages/chat-page";
import Protected from "./components/protected";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Olmadan Girilebilen Sayfalar: */}
        <Route path="/" element={<LoginPage />} />
        {/* Login Olduktan Sonra Girilebilen Sayfalar: */}
        <Route element={<Protected/>}>
        <Route path="/room" element={<RoomPage/>} />
        <Route path="/chat/:room" element={<ChatPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

