import { useDispatch } from "react-redux";
import { clearAuth } from "../../redux/api/authSlice";
import { clearToken } from "../../utils/jwt.utils";
import { IoIosLogOut } from "react-icons/io";

export function SignOut() {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    clearToken();
    dispatch(clearAuth());
  };

  return (
    <>
      <button
        onClick={handleSignOut}
        className="rounded-md px-4 py-2 bg-blue-600 text-zinc-200 border-b-4 border-zinc-700 hover:border-b-zinc-200 hover:bg-blue-500 hover:text-zinc-300"
      >
        <IoIosLogOut size={35} />
      </button>
    </>
  );
}
