package week2;

import java.util.Stack;

public class StackDemo {
    public Stack<String> demoStack() {
        Stack<String> borrowedBooks = new Stack<>();
        borrowedBooks.push("Book1");
        borrowedBooks.push("Book2");
        borrowedBooks.push("Book3");
        return borrowedBooks;
    }

    public void borrowBook(Stack<String> borrowedBooks, String book) {
        borrowedBooks.push(book);
    }

    public String returnBook(Stack<String> borrowedBooks) {
        return borrowedBooks.pop();
    }

    public String peekBorrowedBook(Stack<String> borrowedBooks) {
        return borrowedBooks.peek();
    }

    public boolean searchBorrowedBook(Stack<String> borrowedBooks, String book) {
        return borrowedBooks.contains(book);
    }
}

