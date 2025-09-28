import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Input from "../../UI/Input/Input";
import styles from "./Chat.module.scss";
import Messages from "./Messages";
import Button from "../../UI/button/Button";
import ListUsers from "../list-users/ListUsers";
import type { IParamsChannel, IUserMessageData } from "../../types";

const socket = io("http://localhost:5000");

const FormInput = ({ params }: { params: IParamsChannel }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    socket.emit("sendMessage", { message, params });
    setMessage("");
  };
  return (
    <form onSubmit={handleSendMessage} className="df">
      <Input
        type="text"
        name="message"
        placeholder="Напишите что-нибудь"
        value={message}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMessage(e.target.value)
        }
        required
      />
      <Button type="submit">отправить</Button>
    </form>
  );
};

const Chat = () => {
  const { search } = useLocation();
  const [params, setParams] = useState<IParamsChannel | null>(null);
  const [usersMessages, setUsersMessages] = useState<IUserMessageData[]>([]);
  console.log("usermessaf", usersMessages);
  const [isOpenList, setIsOpenList] = useState(false);
  const [countUsers, setCountUsers] = useState(0);
  const navigate = useNavigate();

  // params object
  useEffect(() => {
    const searchParams = Object.fromEntries(
      new URLSearchParams(search)
    ) as unknown as IParamsChannel;
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);

  // event sockets
  useEffect(() => {
    socket.on("message", ({ data }: { data: IUserMessageData }) => {
      setUsersMessages((message) => [...message, data]);
    });
    socket.on("room", ({ data }: { data: { users: IParamsChannel[] } }) => {
      setCountUsers(data.users.length);
    });
    socket.on("kicked", () => {
      alert("Вы были удалены из комнаты владельцем!");
      navigate("/");
    });

    if (params)
      return () => {
        socket.off("message");
        socket.off("room");
        socket.off("kicked");
      };
  }, []);

  return (
    <div className="df jcc" style={{ height: "100vh" }}>
      <div className={`${styles.chat} df fdc`}>
        <header
          className={`${styles.header} df jcsb aic`}
          onClick={() => setIsOpenList(true)}
        >
          <div className={`${styles.avatar} df aic`}>
            <img
              src="https://www.iconpacks.net/icons/1/free-user-group-icon-296-thumb.png"
              alt=""
            />
            <h2>{params?.room}</h2>
          </div>
          <p>{countUsers} участников</p>
        </header>

        {isOpenList ? (
          <>
            <img
              onClick={() => setIsOpenList(false)}
              className={styles.backChat}
              src="https://cdn-icons-png.flaticon.com/512/9196/9196401.png"
              alt=""
            />
            <ListUsers params={params!} />
          </>
        ) : (
          <>
            <Messages messages={usersMessages} name={params?.name || ""} />
            <FormInput params={params!} />
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
