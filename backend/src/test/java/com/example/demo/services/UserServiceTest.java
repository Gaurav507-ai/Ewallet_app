package com.example.demo.services;

import com.example.demo.collections.User;
import com.example.demo.repositories.UserRepository;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class UserServiceTest {
    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private UserService userService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JavaMailSender mailSender;

    @Test
    void loadUserByUsernameTest() {
        String email = "kundwanirahul22@gmail.com";
        User user = new User();
        user.setUserId("123");
        user.setName("Gaurav");
        user.setEmail("kundwanirahul22@gmail.com");
        user.setPassword(passwordEncoder.encode("Gaurav"));
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        Optional<UserDetails> actual = Optional.of(userService.loadUserByUsername(email));
        assertEquals(Optional.of(user), actual);
        verify(userRepository,times(1)).findByEmail(email);
    }

    @Test
    void getUsersTest() {
        User user1 = new User();
        user1.setUserId("123");
        user1.setName("Gaurav");
        user1.setEmail("gauravkundwani4@gmail.com");
        user1.setPassword(passwordEncoder.encode("Gaurav"));
        User user2 = new User();
        user2.setUserId("456");
        user2.setName("Rahul");
        user2.setEmail("kundwanirahul22@gmail.com");
        when(userRepository.findAll()).thenReturn(Stream.of(user1, user2).collect(Collectors.toList()));
        assertEquals(2, userService.getUsers().size());
    }

    @Test
    void getUserByEmailTest() {
        String email = "kundwanirahul22@gmail.com";
        User user = new User();
        user.setUserId("123");
        user.setName("Gaurav");
        user.setEmail("kundwanirahul22@gmail.com");
        user.setPassword(passwordEncoder.encode("Gaurav"));
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        Optional<User> actual = Optional.ofNullable(userService.getUserByEmail(email));
        assertEquals(Optional.of(user), actual);
    }

    @Test
    void createUserTest() {
        User user = new User();
        user.setUserId("123");
        user.setName("Gaurav");
        user.setEmail("kundwanirahul22@gmail.com");
        user.setPassword(passwordEncoder.encode("Gaurav"));
        when(userRepository.save(user)).thenReturn(user);
        assertEquals(user, userService.createUser(user));
    }

    @Test
    void sendVerificationEmailTest() throws Exception {
        User user = new User();
        user.setName("Gaurav");
        user.setEmail("gauravkundwani4@gmail.com");
        user.setVerificationCode("12345");
        String siteURL = "https://example.com";
        MimeMessage mimeMessage = mock(MimeMessage.class);
//        MimeMessageHelper mimeMessageHelper = mock(MimeMessageHelper.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
//        when(new MimeMessageHelper(mimeMessage)).thenReturn(mimeMessageHelper);
        userService.sendVerificationEmail(user, siteURL);
//        verify(mimeMessageHelper).setFrom("walletbanker027@gmail.com", "Ewallet team");
//        verify(mimeMessageHelper).setTo(user.getEmail());
//        verify(mimeMessageHelper).setSubject("Please verify your registration");
//        verify(mimeMessageHelper).setText(any(String.class), true);
        verify(mailSender, times(1)).createMimeMessage();
    }
    @Test
    void verifyTest(){
        String verificationCode = "12345";
        User user = new User();
        user.setName("Gaurav");
        user.setEmail("gauravkundwani4@gmail.com");
        user.setVerificationCode("12345");
        user.setEnabled(false);
        when(userRepository.findByVerificationCode(verificationCode)).thenReturn(user);
        boolean result = userService.verify(verificationCode);
        assertTrue(result);
        verify(userRepository, times(1)).save(user);
    }

}