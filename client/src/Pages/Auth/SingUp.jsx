import { useState } from "react";

function SingUp() {
  const [NewUser, setNewUser] = useState({
    name: "",
    phone: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  // 1️⃣ Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // 2️⃣ Validate inputs
  const validateForm = () => {
    const newErrors = {};

    // name: at least 2 chars
    if (!NewUser.name || NewUser.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // phone: digits only, 8–15 digits
    if (!/^\d{8,15}$/.test(NewUser.phone)) {
      newErrors.phone = "Phone must be 8–15 digits";
    }

    // email: simple regex
    if (
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(NewUser.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    // password: at least 6 chars
    if (NewUser.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    // return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // 3️⃣ Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("New user:", NewUser);
      alert("Form submitted successfully!");
    } else {
      console.log("Validation failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Name"
          onChange={handleInputChange}
          name="name"
          value={NewUser.name}
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Phone"
          onChange={handleInputChange}
          name="phone"
          value={NewUser.phone}
        />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          onChange={handleInputChange}
          name="email"
          value={NewUser.email}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          onChange={handleInputChange}
          name="password"
          value={NewUser.password}
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SingUp;
