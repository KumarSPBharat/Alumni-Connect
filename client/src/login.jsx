import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                window.location.reload();
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
                Connect. Network. Grow.
            </p>

            <h2>Welcome Back</h2>

            <form onSubmit={handleLogin}>
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

                <button type="submit">Login</button>
            </form>

            {message && <p className="error-message">{message}</p>}
        </div>
    );
}

export default Login;