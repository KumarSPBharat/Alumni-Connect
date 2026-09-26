import { useEffect, useState } from "react";

function Dashboard() {
    const token = localStorage.getItem("token");

    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [message, setMessage] = useState("");
    const [editing, setEditing] = useState(false);
    const [creating, setCreating] = useState(false);

    const [formData, setFormData] = useState({
        phone: "",
        college: "",
        course: "",
        graduationYear: "",
        company: "",
        bio: "",
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const userResponse = await fetch(
                    "https://alumni-connect-b13q.onrender.com/api/auth/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const userData = await userResponse.json();

                if (userResponse.ok) {
                    setUser(userData.user);
                }

                const profileResponse = await fetch(
                    "https://alumni-connect-b13q.onrender.com/api/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const profileData = await profileResponse.json();

                if (profileResponse.ok) {
                    setProfile(profileData.profile);

                    setFormData({
                        phone: profileData.profile.phone || "",
                        college: profileData.profile.college || "",
                        course: profileData.profile.course || "",
                        graduationYear:
                            profileData.profile.graduationYear || "",
                        company: profileData.profile.company || "",
                        bio: profileData.profile.bio || "",
                    });
                } else if (profileResponse.status === 404) {
                    setCreating(true);
                } else {
                    setMessage(profileData.message);
                }
            } catch (error) {
                setMessage("Server connection failed");
            }
        };

        getData();
    }, [token]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const createProfile = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "https://alumni-connect-b13q.onrender.com/api/profile",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setProfile(data.profile);
                setCreating(false);
                setMessage("Profile created successfully!");
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("Server connection failed");
        }
    };

    const updateProfile = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "https://alumni-connect-b13q.onrender.com/api/profile",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setProfile(data.profile);
                setEditing(false);
                setMessage("Profile updated successfully!");
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("Server connection failed");
        }
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>
                    {user ? `Welcome, ${user.name} 👋` : "Welcome"}
                </h1>

                <p>Manage your profile and connect with your alumni community.</p>
            </div>

            {message && <p>{message}</p>}

            {/* Create Profile */}
            {creating && (
                <div className="profile-card">
                    <h2>Create Your Profile</h2>

                    <form onSubmit={createProfile}>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="college"
                            placeholder="College"
                            value={formData.college}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="course"
                            placeholder="Course"
                            value={formData.course}
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            name="graduationYear"
                            placeholder="Graduation Year"
                            value={formData.graduationYear}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="company"
                            placeholder="Company"
                            value={formData.company}
                            onChange={handleChange}
                        />

                        <textarea
                            name="bio"
                            placeholder="Bio"
                            value={formData.bio}
                            onChange={handleChange}
                        />

                        <button type="submit">
                            Create Profile
                        </button>
                    </form>
                </div>
            )}

            {/* View Profile */}
            {profile && !editing && (
                <div className="profile-card">
                    <h2>My Profile</h2>

                    <p>Phone: {profile.phone}</p>
                    <p>College: {profile.college}</p>
                    <p>Course: {profile.course}</p>
                    <p>Graduation Year: {profile.graduationYear}</p>
                    <p>Company: {profile.company}</p>
                    <p>Bio: {profile.bio}</p>

                    <button onClick={() => setEditing(true)}>
                        Edit Profile
                    </button>
                </div>
            )}

            {profile && !editing && (
                <div className="profile-card">
                    <div className="profile-top">
                        <div className="profile-avatar">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <h2>{user?.name}</h2>
                            <p className="profile-role">
                                {user?.role || "Alumni Member"}
                            </p>
                        </div>
                    </div>

                    <div className="profile-grid">
                        <div className="profile-info">
                            <span>📞 Phone</span>
                            <strong>{profile.phone || "Not added"}</strong>
                        </div>

                        <div className="profile-info">
                            <span>🎓 College</span>
                            <strong>{profile.college || "Not added"}</strong>
                        </div>

                        <div className="profile-info">
                            <span>📚 Course</span>
                            <strong>{profile.course || "Not added"}</strong>
                        </div>

                        <div className="profile-info">
                            <span>📅 Graduation</span>
                            <strong>{profile.graduationYear || "Not added"}</strong>
                        </div>

                        <div className="profile-info">
                            <span>💼 Company</span>
                            <strong>{profile.company || "Not added"}</strong>
                        </div>
                    </div>

                    <div className="bio-section">
                        <span>About Me</span>
                        <p>{profile.bio || "No bio added yet."}</p>
                    </div>

                    <button onClick={() => setEditing(true)}>
                        Edit Profile
                    </button>
                </div>
            )}
        </div>
    );
}

export default Dashboard;