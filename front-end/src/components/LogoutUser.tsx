import { useRouter } from "next/navigation";

export default function LogoutUser() {
  const router = useRouter();

  const logoutUser = async () => {
    try {
      const response = await fetch("http://localhost:3001/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        console.log(response.statusText);
        return;
      }
    } catch (e) {
      console.log(e);
    }
    router.push("/");
  };

  return (
    <div className="absolute right-6 top-6">
      <button onClick={logoutUser}>logout</button>
    </div>
  );
}
