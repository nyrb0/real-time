import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import Input from "../../UI/Input/Input";
import styles from "./Chat.module.scss";
import Messages from "./Messages";
import Button from "../../UI/button/Button";

const socket = io("http://localhost:5000");

const Chat = () => {
  const { search } = useLocation();
  const [params, setParams] = useState<{ room: string; name: string } | null>(
    null
  );
  const [usersMessages, setUsersMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams as { room: string; name: string });
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }: { data: any }) => {
      setUsersMessages((message) => [...message, data]);
      console.log(data);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (!message) return;

    socket.emit("sendMessage", { message, params });
    setMessage("");
  };
  console.log(usersMessages);
  return (
    <div className="df jcc aic" style={{ height: "100vh" }}>
      <div className={`${styles.chat} df fdc`}>
        <header className={`${styles.header} df jcsb aic`}>
          <div className={`${styles.avatar} df aic`}>
            <img
              src="https://www.nicepng.com/png/detail/131-1318812_avatar-group-icon.png"
              alt=""
            />
            <h2>{params?.room}</h2>
          </div>
          <p>4 пользователей</p>
        </header>
        <div className={`${styles.inner}`}>
          <Messages messages={usersMessages} name={params?.name!} />
        </div>
        <form onSubmit={handleSendMessage} className="df">
          <Input
            type="text"
            name="message"
            placeholder="Напишите что-нибудь"
            value={message}
            onChange={handleChange}
            required
          />
          <Button type="submit">отправить</Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
