type PageWrapperProps = {
  children: React.ReactNode;
};

export function PageWrapper({ ...props }: PageWrapperProps) {
  return (
    <div className="p-4 flex flex-col bg-zinc-200 text-black overflow-x-hidden min-w-full min-h-screen">
      {props.children}
    </div>
  );
}
