package week2;

import java.util.ArrayDeque;
import java.util.Deque;

public class DequeDemo {
    public Deque<String> demoDeque() {
        Deque<String> returnQueue = new ArrayDeque<>();
        returnQueue.addFirst("Book1");
        returnQueue.addLast("Book2");
        returnQueue.addFirst("Book3");
        return returnQueue;
    }

    public void addFirstReturn(Deque<String> returnQueue, String book) {
        returnQueue.addFirst(book);
    }

    public void addLastReturn(Deque<String> returnQueue, String book) {
        returnQueue.addLast(book);
    }

    public String processFirstReturn(Deque<String> returnQueue) {
        return returnQueue.removeFirst();
    }

    public String processLastReturn(Deque<String> returnQueue) {
        return returnQueue.removeLast();
    }

    public boolean searchReturnQueue(Deque<String> returnQueue, String book) {
        return returnQueue.contains(book);
    }
}

