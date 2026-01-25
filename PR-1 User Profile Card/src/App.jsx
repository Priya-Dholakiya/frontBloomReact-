import { useState, useEffect } from "react";
import UserForm from "./Components/UserForm";
import UserProfileCard from "./Components/UserProfileCard";
import "./App.css";

function App() {
  const [ users, setUsers ] = useState( [] );

  // 🔁 Reload pe data lao
  useEffect( () => {
    const savedUsers = localStorage.getItem( "userProfiles" );
    if ( savedUsers ) {
      setUsers( JSON.parse( savedUsers ) );
    }
  }, [] );

  // ➕ New card add karo
  const handleSubmit = ( data ) => {
    const updatedUsers = [ ...users, data ];
    setUsers( updatedUsers );
    localStorage.setItem( "userProfiles", JSON.stringify( updatedUsers ) );
  };

  return (
    <div className="page">
      <UserForm onSubmit={handleSubmit} />

      <div className="cards-grid">
        {users.map( ( user, index ) => (
          <UserProfileCard key={index} {...user} />
        ) )}
      </div>
    </div>
  );

}

export default App;
