import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";

export interface Book {
    id: string;
    title: string;
    author: string;
    year: number;
    category: string;
}

interface BookState {
    items: Book[];
    loading: boolean;
    error: string | null;
}

const initialState: BookState = {
    items: [],
    loading: false,
    error: null,
};

// đổi sang server cổng 5000
const API_URL = "http://localhost:5000/books";

// Thunks
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
    const res = await axios.get<Book[]>(API_URL);
    return res.data;
});

export const addBook = createAsyncThunk(
    "books/addBook",
    async (book: Omit<Book, "id">) => {
        const res = await axios.post<Book>(API_URL, book);
        return res.data;
    }
);

export const updateBook = createAsyncThunk(
    "books/updateBook",
    async (book: Book) => {
        const res = await axios.put<Book>(`${API_URL}/${book.id}`, book);
        return res.data;
    }
);

export const deleteBook = createAsyncThunk(
    "books/deleteBook",
    async (id: string) => {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    }
);

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch books";
            })
            // add
            .addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
                state.items.unshift(action.payload);
            })
            // update
            .addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
                const idx = state.items.findIndex((b) => b.id === action.payload.id);
                if (idx !== -1) state.items[idx] = action.payload;
            })
            // delete
            .addCase(deleteBook.fulfilled, (state, action: PayloadAction<string>) => {
                state.items = state.items.filter((b) => b.id !== action.payload);
            });
    },
});

export default bookSlice.reducer;
