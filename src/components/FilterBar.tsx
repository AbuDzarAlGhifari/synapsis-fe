import React from 'react';
import { Select } from 'antd';

interface FilterBarProps {
  placeholder?: string;
  value: any;
  onChange: (value: any) => void;
  options: { value: any; label: string }[];
  allowClear?: boolean;
  style?: React.CSSProperties;
}

const FilterBar: React.FC<FilterBarProps> = ({
  placeholder = 'Filter',
  value,
  onChange,
  options,
  allowClear = true,
  style,
}) => {
  return (
    <Select
      placeholder={placeholder}
      value={value || undefined}
      onChange={onChange}
      options={options}
      allowClear={allowClear}
      style={style || { width: 200 }}
    />
  );
};

export default FilterBar;
