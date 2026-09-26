import { useState } from "react";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "https://alumni-connect-b13q.onrender.com/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        role: "student",
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage("Registration successful!");
                setName("");
                setEmail("");
                setPassword("");
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("Server connection failed");
        }
    };

    return (
        <div className="auth-container">
            <h1>Alumni Connect</h1>
            <p className="auth-subtitle">
                Create your alumni account
            </p>

            <h2>Create Account</h2>

            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Register</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;