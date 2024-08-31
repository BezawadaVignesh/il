package week2;

import java.util.PriorityQueue;
import java.util.Queue;

public class PriorityQueueDemo {
    public Queue<String> demoPriorityQueue() {
        Queue<String> reservationQueue = new PriorityQueue<>();
        reservationQueue.add("Book1");
        reservationQueue.add("Book2");
        reservationQueue.add("Book3");
        return reservationQueue;
    }

    public void reserveBook(Queue<String> reservationQueue, String book) {
        reservationQueue.add(book);
    }

    public String processReservation(Queue<String> reservationQueue) {
        return reservationQueue.poll();
    }

    public boolean searchReservation(Queue<String> reservationQueue, String book) {
        return reservationQueue.contains(book);
    }
}
