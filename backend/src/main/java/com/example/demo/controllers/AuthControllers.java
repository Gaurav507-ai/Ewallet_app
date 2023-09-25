package com.example.demo.controllers;

import com.example.demo.collections.User;
import com.example.demo.payloads.JwtRequest;
import com.example.demo.payloads.JwtResponse;
import com.example.demo.security.JwtHelper;
import com.example.demo.services.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/auth")

public class AuthControllers {

    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtHelper helper;

    @Autowired
    private AuthenticationManager manager;



    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

        this.doAuthenticate(request.getEmail(), request.getPassword());


        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = this.helper.generateToken(userDetails);

        JwtResponse response = JwtResponse.builder()
                .jwtToken(token)
                .username(userDetails.getUsername()).build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void doAuthenticate(String email, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            manager.authenticate(authentication);


        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid Username or Password  !!");
        }

    }

    @PostMapping("/register")
    public String createUser(@RequestBody User user, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        userService.createUser(user);
        String siteURL = request.getRequestURL().toString();
        String siteURL1 = siteURL.replace(request.getServletPath(), "");
        userService.sendVerificationEmail(user, siteURL1);
        return "registration successfully";
    }

    @GetMapping("/verify")
    public RedirectView verifyAccount(@Param("code") String code){
        boolean verified = userService.verify(code);
        RedirectView redirectView = new RedirectView();
        if(verified == true) {
            redirectView.setUrl("http://localhost:3000/login/verified");
        }
        return redirectView;
    }

}

