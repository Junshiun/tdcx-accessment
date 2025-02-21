import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchFilter } from '../filter/filter';

const books = [
    "Mockingbird",
    "1984",
    "Pride and Prejudice",
    "The Great Gatsby",
    "Moby Queen",
    "War and Peace",
    "The Catcher in the Rye",
    "The Hobbit",
    "Brave New World",
    "The Lord of the Rings"
  ]

describe("search filter test", () => {
    test('get proper search result', async () => {
        render(<SearchFilter items={books}/>);
        const inputElement = screen.getByRole("textbox");

        const inputType = books[0];

        await userEvent.type(inputElement, inputType);

        await new Promise(resolve => setTimeout(() => resolve("after 1 second"), 1000))

        const listItem = screen.getAllByRole('listitem');

        expect(listItem).toHaveLength(1);
        expect(listItem[0]).toHaveTextContent(inputType)
    });

    test('case insensitive', async () => {
        render(<SearchFilter items={books}/>);
        const inputElement = screen.getByRole("textbox");

        const inputType = books[4];

        await userEvent.type(inputElement, inputType.toLowerCase());

        await new Promise(resolve => setTimeout(() => resolve("after 1 second"), 1000))

        const listItem = screen.getAllByRole('listitem');

        expect(listItem).toHaveLength(1);
        expect(listItem[0]).toHaveTextContent(inputType);
    });

    test('single character', async () => {
        render(<SearchFilter items={books}/>);
        const inputElement = screen.getByRole("textbox");

        const inputType = "a";

        await userEvent.type(inputElement, inputType);

        await new Promise(resolve => setTimeout(() => resolve("after 1 second"), 1000))

        const listItem = screen.getAllByRole('listitem');

        expect(listItem).toHaveLength(books.reduce((acc, book) => {
            if (book.includes(inputType)) {
                return acc + 1
            } else {
                return acc
            }
        }, 0));
    });
})