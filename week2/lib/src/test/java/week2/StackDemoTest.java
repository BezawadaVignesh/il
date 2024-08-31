package week2;

import org.junit.jupiter.api.Test;
import java.util.Stack;

import static org.junit.jupiter.api.Assertions.*;

public class StackDemoTest {

    StackDemo borrowedBooks = new StackDemo();

    @Test
    public void testStack() {
        Stack<String> stack = borrowedBooks.demoStack();
        assertEquals(3, stack.size());
        assertEquals("Book3", stack.peek());

        borrowedBooks.returnBook(stack);
        assertEquals(2, stack.size());
        assertEquals("Book2", stack.peek());

        borrowedBooks.borrowBook(stack, "Book4");
        assertEquals("Book4", stack.peek());
    }
}

