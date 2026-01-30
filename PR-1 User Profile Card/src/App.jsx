import UserProfileCard from "./Components/UserProfileCard";

function App() {
  const users = [
    {
      name: "Sonalika Bhide",
      email: "sonuu@test.in",
      role: "Frontend Developer",
      location: "Surat",
      phone: "9876543210",
      profilePicture:"https://tse4.mm.bing.net/th/id/OIP.2zEGWNBBts15ED4Lysj1QQHaEK?pid=Api&P=0&h=180"
    },
    {
      name: "Jethalal Gada",
      email: "jethalal@test.in",
      role: "Backend Developer",
      location: "Ahmedabad",
      phone: "9123456789",
      profilePicture:"https://tse1.mm.bing.net/th/id/OIP.LbSk68lzFev9N7XTtvhORgHaEK?pid=Api&P=0&h=180"
    },
    {
      name: "Daya Gada",
      email: "daya@test.in",
      role: "UI Designer",
      location: "Vadodara",
      phone: "9012345678",
      profilePicture:"https://tse4.mm.bing.net/th/id/OIP.g3nFQlYbeASLkfDtQAm5IwHaFj?pid=Api&P=0&h=180"
    },
    {
      name: "Tipendra Gada",
      email: "tapuu@test.in",
      role: "Full Stack Developer",
      location: "Rajkot",
      phone: "9988776655",
      profilePicture:"https://tse2.mm.bing.net/th/id/OIP.li-EWZNRax5TyHgHZf-D6QHaEK?pid=Api&P=0&h=180"
    },
    {
      name: "Babita Iyer",
      email: "babita@test.in",
      role: "Full Stack Developer",
      location: "Delhi",
      phone: "9988776655",
      profilePicture:"https://tse4.mm.bing.net/th/id/OIP.CsIzEq9SfnJif0xbIxy7vgHaHd?pid=Api&P=0&h=180"
    }
  ];

  return (
    <div className="container">
      {/* 🔥 YAHIN component CALL ho raha hai */}
      {users.map((user, index) => (
        <UserProfileCard
          key={index}
          name={user.name}
          email={user.email}
          role={user.role}
          location={user.location}
          phone={user.phone}
          profilePicture={user.profilePicture}
        />
      ))}
    </div>
  );
}
export default App;