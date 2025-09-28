import styles from "./Chat.module.scss";

interface IMessages {
  messages: { user: { name: string }; message: string }[];
  name: string;
}

const Messages = ({ name, messages }: IMessages) => {
  return (
    <div className={styles.inner}>
      {messages.map(({ message, user }, i) => {
        const itsme =
          user.name.trim().toLowerCase() === name.trim().toLowerCase();
        const className = itsme ? styles.me : styles.user;
        return (
          <div className={`${styles.message}`} key={i}>
            <div className={`${styles.wrapper} ${className}`}>
              <span className={styles.name}>{user.name}</span>
              <div className={styles.text}>{message}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
