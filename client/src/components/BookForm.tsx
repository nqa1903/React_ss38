import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import type { Book } from './types';

interface Props {
  open: boolean;
  initial?: Partial<Book>;
  onClose: () => void;
  onSubmit: (data: {
    id?: string;
    title: string;
    author: string;
    year: number;
    category: string;
  }) => void;
}

const BookForm: React.FC<Props> = ({ open, initial = {}, onClose, onSubmit }) => {
  const [title, setTitle] = useState(initial.title ?? '');
  const [author, setAuthor] = useState(initial.author ?? '');
  const [year, setYear] = useState(initial.year ?? new Date().getFullYear());
  const [category, setCategory] = useState(initial.category ?? '');

  useEffect(() => {
    setTitle(initial.title ?? '');
    setAuthor(initial.author ?? '');
    setYear(initial.year ?? new Date().getFullYear());
    setCategory(initial.category ?? '');
  }, [initial, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: initial.id, title, author, year: Number(year), category });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{initial.id ? 'Edit Book' : 'Add Book'}</DialogTitle>
        <DialogContent className="flex flex-col gap-[15px] space-y-4 !pt-2">
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Year"
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            fullWidth
          />
          <TextField
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {initial.id ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BookForm;
