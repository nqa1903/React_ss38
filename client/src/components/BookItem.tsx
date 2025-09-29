import { Card, CardContent, IconButton, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import type { Book } from './types';
import React from 'react';

interface Props {
  book: Book;
  onEdit: (b: Book) => void;
  onDelete: (id: string) => void;
}

const BookItem: React.FC<Props> = ({ book, onEdit, onDelete }) => {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent className="flex justify-between items-center">
        <div>
          <Typography variant="h6">{book.title}</Typography>
          <Typography variant="body2" className="text-gray-600">
            {book.author} • {book.year} • {book.category}
          </Typography>
        </div>
        <div className="flex gap-2">
          <IconButton size="small" onClick={() => onEdit(book)}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(book.id)}>
            <Delete fontSize="small" />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookItem;
