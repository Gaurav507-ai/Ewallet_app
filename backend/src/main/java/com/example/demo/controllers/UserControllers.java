package com.example.demo.controllers;


import com.example.demo.collections.User;
import com.example.demo.security.JwtHelper;
import com.example.demo.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserControllers {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtHelper jwtHelper;



    @GetMapping("/info")
    public List<User> getUser(){
        return userService.getUsers();
    }


    @GetMapping("/currentUser")
    public User getLoggedInUser(HttpServletRequest request){
        String requestHeader = request.getHeader("Authorization");
        String token = requestHeader.substring(7);
        String username = this.jwtHelper.getUsernameFromToken(token);
        User user = userService.getUserByEmail(username);
        return user;
    }
}
