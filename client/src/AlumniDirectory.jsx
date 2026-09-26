import { useEffect, useState } from "react";

function AlumniDirectory() {
    const [profiles, setProfiles] = useState([]);
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        const getProfiles = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/profile/all",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setProfiles(data.profiles);
                } else {
                    setMessage(data.message);
                }
            } catch (error) {
                setMessage("Server connection failed");
            }
        };

        getProfiles();
    }, [token]);

    const filteredProfiles = profiles.filter((profile) => {
        const searchText = search.toLowerCase();

        return (
            profile.user?.name?.toLowerCase().includes(searchText) ||
            profile.college?.toLowerCase().includes(searchText) ||
            profile.company?.toLowerCase().includes(searchText)
        );
    });

    return (
        <div className="directory">
            <h2>Alumni Directory</h2>

            <input
                className="search-box"
                type="text"
                placeholder="Search by name, college or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {message && <p>{message}</p>}

            <div className="alumni-list">
                {filteredProfiles.map((profile) => (
                    <div className="alumni-card" key={profile._id}>
                        <h3>{profile.user?.name}</h3>

                        <p>College: {profile.college}</p>
                        <p>Course: {profile.course}</p>
                        <p>Graduation Year: {profile.graduationYear}</p>
                        <p>Company: {profile.company}</p>
                    </div>
                ))}
            </div>

            {filteredProfiles.length === 0 && (
                <p>No alumni found.</p>
            )}
        </div>
    );
}

export default AlumniDirectory;