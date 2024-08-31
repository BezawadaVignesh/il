package week2;

import org.junit.jupiter.api.Test;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class ListDemoTest {

    ListDemo bookList = new ListDemo();

    @Test
    public void testList() {
        List<String> books = bookList.demoList();
        assertEquals(3, books.size());
        assertTrue(books.contains("Book1"));
        assertTrue(books.contains("Book2"));

        bookList.removeBook(books, "Book2");
        assertFalse(books.contains("Book2"));

        bookList.addBook(books, "Book4");
        assertTrue(books.contains("Book4"));
    }
}

