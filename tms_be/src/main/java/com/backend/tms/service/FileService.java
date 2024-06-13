package com.backend.tms.service;

import com.backend.tms.response.FileUploadResponse;
import com.backend.tms.util.FileDownloadUtil;
import com.backend.tms.util.FileUploadUtil;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;

@Service
public class FileService {
    public FileUploadResponse uploadFile(MultipartFile multipartFile) throws IOException {
        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        long size = multipartFile.getSize();
        String fileCode = FileUploadUtil.saveFile(fileName, multipartFile);
        return new FileUploadResponse("File Uploaded successfully.", "/api/downloadFile/" + fileCode, fileName, size);
    }
    public ResponseEntity<?> downloadFile(String fileCode) throws IOException {
        FileDownloadUtil downloadUtil = new FileDownloadUtil();
        Resource resource = null;
        try {
            resource = downloadUtil.getFileAsResource(fileCode);
        } catch (IOException e) {
            throw new IOException("Server storage error.");
        }
        if (resource == null) {
            throw new FileNotFoundException("File with code: "+fileCode+"does not exist.");
        }
        String contentType = "application/octet-stream";
        String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(resource);
    }
}
