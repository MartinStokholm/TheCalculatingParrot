type PageWrapperProps = {
  children: React.ReactNode;
};

export function PageWrapper({ ...props }: PageWrapperProps) {
  return (
    <div className="p-4 flex flex-col place-items-center bg-zinc-200 text-black min-h-screen">
      {props.children}
    </div>
  );
}
