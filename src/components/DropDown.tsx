import React from 'react';

interface Option {
  id: string;
  title: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (id: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => (
  <select onChange={(e) => onSelect(e.target.value)}>
    {options.map((option) => (
      <option key={option.id} value={option.id}>
        {option.title}
      </option>
    ))}
  </select>
);

export default Dropdown;