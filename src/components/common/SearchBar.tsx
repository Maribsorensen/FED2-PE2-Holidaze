type SearchBarProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search venues..."
        className="font-headings text-transform: uppercase rounded-sm py-1 px-4 bg-cta text-white placeholder-white"
      />
    </div>
  );
}
