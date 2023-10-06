package com.example.Ewallet.controllers;

import com.example.Ewallet.collections.PendingUser;
import com.example.Ewallet.collections.User;
import com.example.Ewallet.payloads.JwtRequest;
import com.example.Ewallet.payloads.JwtResponse;
import com.example.Ewallet.security.JwtHelper;
import com.example.Ewallet.services.UserService;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.servlet.view.RedirectView;

import java.io.UnsupportedEncodingException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class AuthControllersTest {

    @Mock
    private AuthenticationManager manager;

    @Mock
    private JwtHelper helper;

    @Mock
    private UserDetailsService userDetailsService;

    @Mock
    private UserService userService;

    @InjectMocks
    private AuthControllers authControllers;



    @Test
    void login() {
        JwtRequest request = new JwtRequest();
        request.setEmail("testuser@example.com");
        request.setPassword("password123");

        UserDetails userDetails = mock(UserDetails.class);

        when(userDetailsService.loadUserByUsername(request.getEmail())).thenReturn(userDetails);

        String mockToken = "123";
        when(helper.generateToken(userDetails)).thenReturn(mockToken);

        ResponseEntity<JwtResponse> responseEntity = authControllers.login(request);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        JwtResponse response = responseEntity.getBody();
        assertNotNull(response);
        assertEquals(mockToken, response.getJwtToken());
    }

    @Test
    void createUser() throws MessagingException, UnsupportedEncodingException {
        PendingUser user = new PendingUser();
        user.setId("123");
        user.setName("Gaurav");
        user.setEmail("testuser@example.com");
        user.setToken("1234");

        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setRequestURI("http://example.com");

        doNothing().when(userService).sendVerificationEmail(user, "http://example.com");

        String result = authControllers.createUser(any(User.class), request);

        assertEquals("registration successfully", result);
    }

    @Test
    void verifyAccount() {
        when(userService.verify(anyString())).thenReturn(true);

        RedirectView redirectView = authControllers.verifyAccount("verificationCode");

        assertNotNull(redirectView);
        assertEquals("http://localhost:3000/login/verified", redirectView.getUrl());

        verify(userService, times(1)).verify("verificationCode");
    }
}