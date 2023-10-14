import {Server} from "socket.io";

let messages = [{message: "Hola mundo", hour: 1692562679535}]

export const socket = (server) => {
    const io = new Server(server)

    io.on("connection", (socket) => {
        console.log("Usuario conectado", socket.id);

        const sendMessages = () => {
            io.emit("server: getMessages", messages)
        };
        sendMessages();

        socket.on("client: addMessage", (message) => {
            // messages = [...messages, message]
            messages.push(message);
            sendMessages();
        });

        socket.on("disconnect", () => {
            console.log("Usuario desconectado", socket.id)
        });
    });
};