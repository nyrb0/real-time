import { Route, Routes } from "react-router-dom";
import Regis from "./components/Regis/Regis";
import Chat from "./components/chat/Chat";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Regis />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default Router;
