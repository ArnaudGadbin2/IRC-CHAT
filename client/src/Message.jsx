export function Message({name, message}){    
    
    return(
        <div className="message">
            <h3>Nom: {name}</h3>
            <p>Message: {message}</p>
        </div>
    );
}