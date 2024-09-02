export default function Header({
  title,
  description,
  button,
}: {
  title: string
  description: string
  button?: JSX.Element
}) {
  return (
    <header className="mb-6 flex items-center justify-between">
      <span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          {title}
        </h1>
        <p className="text-muted-foreground max-w-[800px] text-sm sm:text-base">
          {description}
        </p>
      </span>
      {button}
    </header>
  )
}
