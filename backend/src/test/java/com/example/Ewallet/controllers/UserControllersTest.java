package com.example.Ewallet.controllers;

import com.example.Ewallet.collections.User;
import com.example.Ewallet.security.JwtAuthenticationFilter;
import com.example.Ewallet.security.JwtHelper;
import com.example.Ewallet.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class UserControllersTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserControllers userControllers;

    @Mock
    private JwtHelper jwtHelper;

    @Mock
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Mock
    private HttpServletRequest request;


    @Test
    void getUser(){
        User user1 = new User();
        user1.setUserId("1234");
        user1.setName("Gaurav");
        user1.setEmail("gauravkundwani4@gmail.com");
        user1.setWalletBalance(100.0);
        User user2 = new User();
        user2.setUserId("5678");
        user2.setName("Rahul");
        user2.setEmail("kundwanirahul22@gmail.com");
        user2.setWalletBalance(100.0);
        List<User> actual = Arrays.asList(user1, user2);
        when(userService.getUsers()).thenReturn(actual);
        List<User> result = userControllers.getUser();
        verify(userService, times(1)).getUsers();
        assertEquals(actual, result);
    }

    @Test
    void getLoggedInUser() {
        User user = new User();
        user.setUserId("1234");
        user.setName("test");
        user.setEmail("test@gmail.com");
        user.setWalletBalance(100.0);
        String token = "1234";
        when(request.getHeader("Authorization")).thenReturn("Bearer " + token);
        String username = "test@gmail.com";
        when(jwtHelper.getUsernameFromToken(token)).thenReturn(username);
        when(userService.getUserByEmail(username)).thenReturn(user);
        User result = userControllers.getLoggedInUser(request);
        assertEquals(user, result);
    }

}