import { useEffect, useState } from "react";

export default function useUser() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:3001/users", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          console.log(response.statusText);
          return;
        }

        const data = await response.json();

        console.log(data);

        if (data.user) setUsername(data.user.username);
      } catch (e) {
        console.log(e);
      }
    };

    getUser();
  }, []);

  return username;
}
