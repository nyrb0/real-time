import React, { useState } from "react";
import Input from "../../UI/Input/Input";
import styles from "./Regis.module.scss";
import Button from "../../UI/button/Button";
import type { IParamsChannel } from "../../types";
import { useNavigate } from "react-router-dom";

const Regis = () => {
  const [param, setParam] = useState<IParamsChannel>({ room: "", name: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParam((prev) => ({ ...prev, [name]: value }));
  };

  const handleJoinChannel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/chat?name=${param.name}&room=${param.room}`);
  };

  return (
    <form
      className="df jcc aic"
      style={{ height: "100vh" }}
      onSubmit={handleJoinChannel}
    >
      <div className={`${styles.regis} df aic fdc`}>
        <h1>Регистрация</h1>

        <Input
          name="name"
          required
          onChange={handleChange}
          value={param.name}
          placeholder="Имя"
          label="Введите свое имя"
        />

        <Input
          name="room"
          required
          onChange={handleChange}
          value={param.room}
          placeholder="Канал"
          label="Введите название cущесвуещего или нового канала"
        />

        <Button type="submit">Войти</Button>
      </div>
    </form>
  );
};

export default Regis;
