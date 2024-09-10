export enum TitleSizes {
  Large = "Large",
  Medium = "Medium",
  Small = "Small",
}

type TitleProps = {
  text: string;
  size: TitleSizes;
};

export function Title({ text, size }: TitleProps) {
  let className = "";
  switch (size) {
    case TitleSizes.Large:
      className = "text-3xl";
      break;
    case TitleSizes.Medium:
      className = "text-xl";
      break;
    case TitleSizes.Small:
      className = "text-md";
      break;
  }

  return (
    <h1
      className={
        "border-l-4 rounded-md border-blue-200 p-4 m-4 font-light text-zinc-800 bg-slate-200 " +
        className
      }
    >
      {text}
    </h1>
  );
}
