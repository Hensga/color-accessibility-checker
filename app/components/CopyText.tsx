interface CopyTextProps {
  title?: string;
  paragraph?: string;
  titleClassName?: string;
  paragraphClassName?: string;
}

export default function CopyText({
  title,
  paragraph,
  titleClassName = "",
  paragraphClassName = "",
}: CopyTextProps) {
  return (
    <article>
      <h2 className={`text-3xl ${titleClassName}`}>{title}</h2>
      <p className={`${paragraphClassName}`}>{paragraph}</p>
    </article>
  );
}
