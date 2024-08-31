package week2;

import org.junit.jupiter.api.Test;
import java.util.Deque;

import static org.junit.jupiter.api.Assertions.*;

public class DequeDemoTest {

    DequeDemo returnQueue = new DequeDemo();

    @Test
    public void testDeque() {
        Deque<String> deque = returnQueue.demoDeque();
        assertEquals(3, deque.size());
        assertEquals("Book3", deque.getFirst());

        returnQueue.processFirstReturn(deque);
        assertEquals(2, deque.size());
        assertEquals("Book1", deque.getFirst());

        returnQueue.addLastReturn(deque, "Book4");
        assertEquals("Book4", deque.getLast());
    }
}
