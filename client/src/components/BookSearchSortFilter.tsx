import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import React from 'react';

interface Props {
  search: string;
  category: string;
  sortBy: 'title' | 'year';
  sortDir: 'asc' | 'desc';
  categories: string[];
  onSearchChange: (s: string) => void;
  onCategoryChange: (c: string) => void;
  onSortChange: (by: 'title' | 'year', dir: 'asc' | 'desc') => void;
  onClear: () => void;
}

const BookSearchSortFilter: React.FC<Props> = ({
  search,
  category,
  sortBy,
  sortDir,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onClear,
}) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 items-center">
      <TextField
        label="Search by title or author"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1"
        size="small"
      />

      <FormControl size="small" className="w-40">
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" className="w-40">
        <InputLabel>Sort</InputLabel>
        <Select
          value={`${sortBy}_${sortDir}`}
          label="Sort"
          onChange={(e) => {
            const [by, dir] = (e.target.value as string).split('_');
            onSortChange(by as 'title' | 'year', dir as 'asc' | 'desc');
          }}
        >
          <MenuItem value="title_asc">Title A → Z</MenuItem>
          <MenuItem value="title_desc">Title Z → A</MenuItem>
          <MenuItem value="year_asc">Year ↑</MenuItem>
          <MenuItem value="year_desc">Year ↓</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={onClear} variant="outlined" className="ml-auto">
        Clear
      </Button>
    </div>
  );
};

export default BookSearchSortFilter;
