type PageWrapperProps = {
  children: React.ReactNode;
};

export function PageWrapper({ ...props }: PageWrapperProps) {
  return <div className="container mx-auto p-4">{props.children}</div>;
}
