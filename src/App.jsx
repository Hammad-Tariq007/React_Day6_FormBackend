import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Send data to backend
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        // Show error from backend
        setError("myForm", { message: result.message });
        return;
      }

      alert(result.message); // Success
    } catch (err) {
      setError("myForm", { message: "Server error, please try again." });
    }
  };

  return (
    <>
      {isSubmitting && <p>Submitting...</p>}

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <label>First Name: </label>
          <input
            type="text"
            {...register("firstName", {
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters long",
              },
            })}
            placeholder="First Name"
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
          <br />

          {/* Last Name */}
          <label>Last Name: </label>
          <input
            type="text"
            {...register("lastName", { required: "Last name is required" })}
            placeholder="Last Name"
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
          <br />

          {/* Password */}
          <label>Password: </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            placeholder="Password"
          />
          {errors.password && <p>{errors.password.message}</p>}
          <br />

          {/* Server Error */}
          {errors.myForm && <p>{errors.myForm.message}</p>}

          <button disabled={isSubmitting} type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
