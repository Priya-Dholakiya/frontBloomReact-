function UserForm( { onSubmit } ) {
      const handleSubmit = ( e ) => {
            e.preventDefault();

            const formData = {
                  name: e.target.name.value,
                  email: e.target.email.value,
                  role: e.target.role.value,
                  location: e.target.location.value,
                  phone: e.target.phone.value,
                  profilePicture: e.target.profilePicture.value
            };

            onSubmit( formData );
            e.target.reset();
      };

      return (
            <form className="form" onSubmit={handleSubmit}>
                  <h3>Enter Student Details</h3>

                  <input name="name" placeholder="Name" required />
                  <input name="email" placeholder="Email" required />
                  <input name="role" placeholder="Role" />
                  <input name="location" placeholder="Location" />
                  <input name="phone" placeholder="Phone" />
                  <input
                        name="profilePicture"
                        placeholder="Profile Image ( /avatar1.png )"
                  />

                  <button type="submit">Create Card</button>
            </form>
      );
}

export default UserForm;
