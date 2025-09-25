/**
 * SearchBar component renders a controlled text input for searching.
 *
 * Features:
 * - Controlled input with `value` and `onChange` props.
 * - Calls `onChange` callback whenever the input value changes.
 * - Styled using Tailwind CSS for consistent appearance.
 *
 * @param {Object} props - Component props.
 * @param {string} props.value - The current value of the input.
 * @param {(newValue: string) => void} props.onChange - Callback function called when the input changes.
 *
 * @example
 * <SearchBar value={searchQuery} onChange={setSearchQuery} />
 *
 * @returns {JSX.Element} The SearchBar component.
 */

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
