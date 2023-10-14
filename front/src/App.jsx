import { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "./hooks/useSocket";
import moment from "moment"

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const inputRef = useRef();
  const { socket } = useSocket("http://localhost:5000");

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = useCallback(() => {
    socket.on("server: getMessages", (messages) => {
      setMessages(messages);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("client: addMessage", {message, hour: Date.now()});
    setMessage("");
    inputRef.current.focus();
  };

  return (
    <div className="container mt-5">
      <div className="col-6">
        <form onSubmit={sendMessage}>
          <div className="mb-3">
            <input
              ref={inputRef}
              className="form-control"
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoFocus
            />
          </div>
          <button className="btn btn-primary mb-3" type="submit">
            Enviar
          </button>
        </form>
      </div>
      {/* <div className="col-12">
        <ul className="list-group">
          {messages.map((message, i) => (
            <li key={i} className="list-group-item">
              {message}
            </li>
          ))}
        </ul>
      </div> */}

      <div className="col-12">
        <ol className="list-group">
          {messages.map((item, i) => (
            <li key={i} className="list-group-item">
              <div className="fw-bold">{item.message}</div>
              {/* {Date.now()} */}
              {moment(item.hour).format('MMMM Do YYYY, h:mm:ss a')}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
