import { useNavigate } from "react-router-dom";

type NavigationButtonProps = {
  text: string | React.ReactNode;
  path: string;
};

export function NavigationButton({ text, path }: NavigationButtonProps) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(path)}
      className="rounded-md px-4 py-2 bg-blue-600 text-zinc-200 border-b-4 border-zinc-700 hover:border-b-zinc-200 hover:bg-blue-500 hover:text-zinc-300"
    >
      {text}
    </button>
  );
}
