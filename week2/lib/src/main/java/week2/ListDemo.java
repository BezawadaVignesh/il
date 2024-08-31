package week2;

import java.util.ArrayList;
import java.util.List;

public class ListDemo {
    public List<String> demoList() {
        List<String> books = new ArrayList<>();
        books.add("Book1");
        books.add("Book2");
        books.add("Book1"); // Duplicates allowed
        return books;
    }

    public void addBook(List<String> books, String book) {
        books.add(book);
    }

    public void removeBook(List<String> books, String book) {
        books.remove(book);
    }

    public boolean searchBook(List<String> books, String book) {
        return books.contains(book);
    }
}
