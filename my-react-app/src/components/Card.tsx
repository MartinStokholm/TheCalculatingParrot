type CardProps = {
  fields: Record<string, string | number | boolean | undefined>;
  imageSrc?: string;
  title?: string;
};

export function Card({ fields, imageSrc, title }: CardProps) {
  return (
    <div className="border rounded-md p-4 shadow-md">
      <img className="h-32 mx-auto my-4 rounded-3xl shadow-md" src={imageSrc} />
      <h2 className="text-3xl font-thin text-start pb-2">{title}</h2>
      {Object.entries(fields).map(([key, value]) => (
        <div key={key} className="mb-2">
          <strong>{key}:</strong> <span>{String(value)}</span>
        </div>
      ))}
    </div>
  );
}
