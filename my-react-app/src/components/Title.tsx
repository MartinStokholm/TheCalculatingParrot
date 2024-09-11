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
        "border-b-4  border-blue-200 pb-1 m-4 font-light text-zinc-800  " +
        className
      }
    >
      {text}
    </h1>
  );
}
