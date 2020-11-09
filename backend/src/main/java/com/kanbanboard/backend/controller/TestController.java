package com.kanbanboard.backend.controller;

import com.kanbanboard.backend.model.Comment;
import com.kanbanboard.backend.model.User;
import com.kanbanboard.backend.repository.CommentRepository;
import com.kanbanboard.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
public class TestController {

    private UserRepository userRepository;

    private CommentRepository commentRepository;

    public TestController(UserRepository userRepository, CommentRepository commentRepository) {
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }

    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public Comment test() {

        User user = new User("test", "test", "test", "test");
        userRepository.save(user);

        Comment comment = new Comment(user, "Hello World");
        commentRepository.save(comment);

        return comment;
    }
}
