export enum TitleSizes {
  Large = "Large",
  Medium = "Medium",
  Small = "Small",
}

type TitleProps = {
  text: string;
  size: TitleSizes;
  className?: string;
};

export function Title({ text, size, className }: TitleProps) {
  let localClassName = "";
  switch (size) {
    case TitleSizes.Large:
      localClassName = "text-3xl";
      break;
    case TitleSizes.Medium:
      localClassName = "text-xl";
      break;
    case TitleSizes.Small:
      localClassName = "text-md";
      break;
  }

  return (
    <h1
      className={
        "border-b-4  border-blue-200 pb-1 m-4 font-light text-zinc-800  " +
        localClassName +
        " " +
        className
      }
    >
      {text}
    </h1>
  );
}
