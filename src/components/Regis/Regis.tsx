import React, { useState } from "react";
import Chat from "../chat/Chat";
import Input from "../../UI/Input/Input";
import styles from "./Regis.module.scss";
import Button from "../../UI/button/Button";

const Regis = () => {
  const [name, setName] = useState("");

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <form className="df jcc aic" style={{ height: "100vh" }}>
      <div className={`${styles.regis} df aic fdc`}>
        <h1>Регистрация</h1>
        {/* <Chat /> */}
        <Input
          required
          onChange={handleName}
          value={name}
          placeholder="Имя"
          label="Введите свое имя"
        />
        <Button>Войти</Button>
      </div>
    </form>
  );
};

export default Regis;
