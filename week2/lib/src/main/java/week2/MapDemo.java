package week2;

import java.util.HashMap;
import java.util.Map;

public class MapDemo {
    public Map<String, String> demoMap() {
        Map<String, String> isbnBooks = new HashMap<>();
        isbnBooks.put("ISBN1", "Book1");
        isbnBooks.put("ISBN2", "Book2");
        isbnBooks.put("ISBN1", "Book3"); // Duplicate key, value updated
        return isbnBooks;
    }

    public void addBook(Map<String, String> isbnBooks, String isbn, String book) {
        isbnBooks.put(isbn, book);
    }

    public void removeBook(Map<String, String> isbnBooks, String isbn) {
        isbnBooks.remove(isbn);
    }

    public boolean searchByISBN(Map<String, String> isbnBooks, String isbn) {
        return isbnBooks.containsKey(isbn);
    }

    public boolean searchByTitle(Map<String, String> isbnBooks, String title) {
        return isbnBooks.containsValue(title);
    }
}

