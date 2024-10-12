package com.ennea.academy.services;

import org.springframework.core.io.UrlResource;
//import org.springframework.core.io.ResourceRegion
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.file.Paths;

@Service
public class VideoStreamService {

    private final String VIDEO_DIRECTORY = "videos/";

    public ResponseEntity<ResourceRegion> streamVideo(String filename, HttpHeaders headers) throws IOException {
        File videoFile = new File(filename);
        RandomAccessFile randomAccessFile = new RandomAccessFile(videoFile, "r");

        // Create a Resource for the video file
        UrlResource videoResource = new UrlResource(videoFile.toURI());

        long contentLength = videoResource.contentLength();
        HttpRange range = headers.getRange().isEmpty() ? null : headers.getRange().get(0);

        if (range != null) {
            long start = range.getRangeStart(contentLength);
            long end = range.getRangeEnd(contentLength);
            long rangeLength = Math.min(1 * 1024 * 1024, end - start + 1); // Serve 1MB chunks
            ResourceRegion resourceRegion = new ResourceRegion(videoResource, start, rangeLength);

            return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                    .contentType(MediaTypeFactory.getMediaType(videoResource).orElse(MediaType.APPLICATION_OCTET_STREAM))
                    .body(resourceRegion);
        } else {
            long rangeLength = Math.min(1 * 1024 * 1024, contentLength);
            ResourceRegion resourceRegion = new ResourceRegion(videoResource, 0, rangeLength);

            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaTypeFactory.getMediaType(videoResource).orElse(MediaType.APPLICATION_OCTET_STREAM))
                    .body(resourceRegion);
        }
    }
}

