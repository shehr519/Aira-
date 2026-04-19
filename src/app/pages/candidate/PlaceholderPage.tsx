interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="p-8 bg-[#fafafc] min-h-full">
      <h1 className="text-4xl font-bold text-black mb-2">{title}</h1>
      {description && <p className="text-base text-gray-500">{description}</p>}
      <div className="mt-10 flex items-center justify-center h-60 border-2 border-dashed border-gray-200 rounded-2xl">
        <p className="text-gray-400 text-lg">Content coming soon...</p>
      </div>
    </div>
  );
}
