"use client";
import useUser from "../hooks/useUser";
import LogoutUser from "./LogoutUser";
import ReturnHome from "./ReturnHome";

export default function UserProfile() {
  const user = useUser();
  return (
    <div className="flex flex-col items-center mt-12 ">
      {user ? <h1>{user}</h1> : <h1>Not logged in</h1>}
      {!user ? <ReturnHome /> : <LogoutUser />}
    </div>
  );
}
