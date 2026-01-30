function UserProfileCard({
  name,
  email,
  role,
  location,
  phone,
  profilePicture,
}) {
  return (
    <div className="card">
      <img src={profilePicture} className="avatar" alt="profile" />
      <h2>{name}</h2>
      <p className="email">{email}</p>
      <div className="details">
        <p>
          <b>Role:</b> {role}
        </p>
        <p>
          <b>Location:</b> {location}
        </p>
        <p>
          <b>Phone:</b> {phone}
        </p>
      </div>
    </div>
  );
}
export default UserProfileCard;