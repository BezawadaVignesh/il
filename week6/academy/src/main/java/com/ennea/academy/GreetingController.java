package com.ennea.academy;

import java.io.IOException;
import java.util.concurrent.atomic.AtomicLong;

import com.ennea.academy.services.VideoStreamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@RestController
public class GreetingController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/greeting")
    public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }

    @Autowired
    private VideoStreamService videoStreamService;

    @GetMapping("/stream")
    public ResponseEntity<ResourceRegion> streamVideo(@RequestParam(value = "filename", defaultValue = "C:\\Users\\vigne\\Videos\\usb\\Harry Potter movies\\Harry_Potter_and_the_Sorcerer's_Stone_(2001)_320x240.mp4") String filename,
                                                      @RequestHeader HttpHeaders headers) throws IOException {
        return videoStreamService.streamVideo(filename, headers);
    }
}
