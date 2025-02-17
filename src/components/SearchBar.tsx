import React from 'react';
import { Input } from 'antd';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search',
  value,
  onChange,
  style,
}) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={style || { width: 200 }}
    />
  );
};

export default SearchBar;
