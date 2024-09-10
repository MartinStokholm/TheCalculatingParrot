type ErrorBannerProps = {
  title: string;
  text: string;
};

export function ErrorBanner({ title, text }: ErrorBannerProps) {
  return (
    <div role="alert" className="w-[80%] mx-auto mt-4">
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        {title}
      </div>
      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>{text}</p>
      </div>
    </div>
  );
}
