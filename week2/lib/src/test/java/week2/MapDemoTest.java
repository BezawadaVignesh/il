package week2;

import org.junit.jupiter.api.Test;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class MapDemoTest {

    MapDemo isbnMap = new MapDemo();

    @Test
    public void testMap() {
        Map<String, String> isbnBooks = isbnMap.demoMap();
        assertEquals(2, isbnBooks.size());
        assertTrue(isbnBooks.containsKey("ISBN1"));
        assertTrue(isbnBooks.containsValue("Book2"));

        isbnMap.removeBook(isbnBooks, "ISBN2");
        assertFalse(isbnBooks.containsKey("ISBN2"));

        isbnMap.addBook(isbnBooks, "ISBN3", "Book4");
        assertTrue(isbnBooks.containsValue("Book4"));
    }
}

