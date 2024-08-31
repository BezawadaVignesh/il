package week2;

import java.util.HashSet;
import java.util.Set;

public class SetDemo {
    public Set<String> demoSet() {
        Set<String> authors = new HashSet<>();
        authors.add("Author1");
        authors.add("Author2");
        authors.add("Author1");
        return authors;
    }

    public void addAuthor(Set<String> authors, String author) {
        authors.add(author);
    }

    public void removeAuthor(Set<String> authors, String author) {
        authors.remove(author);
    }

    public boolean searchAuthor(Set<String> authors, String author) {
        return authors.contains(author);
    }
}
