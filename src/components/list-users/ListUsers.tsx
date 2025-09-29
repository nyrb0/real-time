import { useEffect, useState } from "react";
import styles from "./ListUser.module.scss";
import Button from "../../UI/button/Button";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import type { IParamsChannel } from "../../types";
import Input from "../../UI/Input/Input";

const socket = io("https://real-time-backend-k7no.onrender.com/");

interface IListUsers {
  params: { room: string; name: string };
}

const ListUsers = ({ params }: IListUsers) => {
  const [users, setUsers] = useState<IParamsChannel[]>([]);
  const [search, setSearch] = useState(""); // поле поиска
  const navigate = useNavigate();

  // check is owner in the channel
  const currentUser = users.find((u) => u.name === params.name);
  const isOwner = !!currentUser?.owner;

  // join sockets
  useEffect(() => {
    socket.on("room", ({ data }: { data: { users: IParamsChannel[] } }) => {
      setUsers(data.users);
    });
    socket.emit("join", params);
    return () => {
      socket.off("room");
    };
  }, [params]);

  // left from channel
  const handleLeft = () => {
    socket.emit("leftRoom", { params });
    navigate("/");
  };

  // remove users for owner
  const handleRemoveUser = (user: IParamsChannel) => {
    if (!window.confirm(`Вы уверены, что хотите удалить ${user.name}?`)) return;
    socket.emit("removeUser", { target: user, ownerParams: currentUser });
  };

  // filter list users
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.list}>
      {/* search component */}
      <Input
        placeholder="Поиск"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* list users */}
      <h3>Участники канала</h3>
      {filteredUsers.length ? (
        filteredUsers.map((user) => (
          <div
            key={user.name + user.room}
            className={`${styles.user} df jcsb aic`}
          >
            <p>{user.name}</p>
            {isOwner && user.name !== params.name && (
              <button type="button">
                <img
                  onClick={() => handleRemoveUser(user)}
                  src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png"
                  alt="Удалить пользователя"
                />
              </button>
            )}
          </div>
        ))
      ) : (
        <h4 className="df jcc">(Пусто)</h4>
      )}

      <div className="df jce">
        <Button className={styles.left} onClick={handleLeft}>
          Покинуть канал
        </Button>
      </div>
    </div>
  );
};

export default ListUsers;
