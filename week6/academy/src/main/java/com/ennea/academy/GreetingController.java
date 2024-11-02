package com.ennea.academy;

import java.io.IOException;
import java.util.concurrent.atomic.AtomicLong;

import com.ennea.academy.entities.CourseContent;
import com.ennea.academy.entities.User;
import com.ennea.academy.repositories.CourseContentRepository;
import com.ennea.academy.services.VideoStreamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticatedPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@RestController
public class GreetingController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @Autowired
    private CourseContentRepository courseContentRepository;

    @GetMapping("/greeting")
    public Object greeting(Authentication user) {
//        System.out.println(((User)user.getPrincipal()).getId());
        return "Hello !";
    };


    @Autowired
    private VideoStreamService videoStreamService;

    @GetMapping("/stream/{contentId}")
    public ResponseEntity<ResourceRegion> streamVideo(@PathVariable Long contentId,
                                                      @RequestHeader HttpHeaders headers) throws IOException {
        CourseContent courseContent = courseContentRepository.findById(contentId).orElseThrow(() -> new RuntimeException("CourseContent not found"));

        return videoStreamService.streamVideo(courseContent.getContentUrl(), headers);
    }
}
