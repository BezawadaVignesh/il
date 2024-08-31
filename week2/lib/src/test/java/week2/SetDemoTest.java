package week2;

import org.junit.jupiter.api.Test;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

public class SetDemoTest {

    SetDemo authorSet = new SetDemo();

    @Test
    public void testSet() {
        Set<String> authors = authorSet.demoSet();
        assertEquals(2, authors.size());
        assertTrue(authors.contains("Author1"));
        assertTrue(authors.contains("Author2"));

        authorSet.removeAuthor(authors, "Author2");
        assertFalse(authors.contains("Author2"));

        authorSet.addAuthor(authors, "Author3");
        assertTrue(authors.contains("Author3"));
    }
}
