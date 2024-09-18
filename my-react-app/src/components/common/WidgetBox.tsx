type WidgetBoxProps = {
  children: React.ReactNode;
};

export function WidgetBox({ children }: WidgetBoxProps) {
  return (
    <div className="flex flex-col min-w-full bg-slate-500 p-4 ">{children}</div>
  );
}
