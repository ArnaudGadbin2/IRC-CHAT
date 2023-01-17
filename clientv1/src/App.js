import io from 'socket.io-client'
import {useEffect, useState } from "react";
import styled, {createGlobalStyle, ThemeProvider} from "styled-components"

const socket = io.connect("http://localhost:5000");
const Header = styled.header`
background: black;
color: white;
text-align: center;
margin: 10px;
padding: 5px;
`
const Img= styled.img`
margin:10px;
padding: 5px;
`
const GlobalStyle = createGlobalStyle`
body {
    colors:#333;
    background:	#6495ed;
}
`
const Wrapper = styled.div`
background: black;
color: white;
text-align: center;
margin: 100px;
padding: 5px;
`
const Button =styled.button` 
border: none;
padding: 10px 14px;
font-size: 1.2rem;
cursor: pointer;
color: black;
background: darkgray;
`
function App(){ 
    const [message, setMessage] = useState ("");
    const [messageReceived, setMessageReceived] = useState("");
    const sendMessage = () => {
        socket.emit("send_message", { message});
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessageReceived(data.message);  
        });
    }, [socket]);
    return <div className="App">
    <GlobalStyle/>
        <Img className='image' src='logo.jpg'></Img>
        <Header><h1>Welcome to IRC CHAT</h1></Header>
        <input 
        placeholder="Message"
        onChange = {(event) =>{
            setMessage(event.target.value);
        }}        
        />
        <Button onClick={sendMessage}> Send Message</Button>
        <Wrapper><h2> Message: </h2></Wrapper>
        {messageReceived}
    </div>
}

export default App;

