package com.example.Ewallet.services;

import com.example.Ewallet.collections.PendingUser;
import com.example.Ewallet.collections.User;
import com.example.Ewallet.repositories.PendingUserRepository;
import com.example.Ewallet.repositories.UserRepository;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.javamail.JavaMailSender;
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

    @Mock
    private PendingUserRepository pendingUserRepository;

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
        PendingUser pendingUser = new PendingUser();
        pendingUser.setName("Gaurav");
        pendingUser.setEmail("kundwanirahul22@gmail.com");
        pendingUser.setPassword(passwordEncoder.encode("Gaurav"));
        pendingUser.setToken("4455");
        User user = new User();
        user.setUserId("123");
        user.setName(pendingUser.getName());
        user.setEmail(pendingUser.getEmail());
        user.setPassword(pendingUser.getPassword());
        when(userRepository.save(user)).thenReturn(user);
        User actual = userService.createUser(pendingUser);

    }

    @Test
    void sendVerificationEmailTest() throws Exception {
        PendingUser user = new PendingUser();
        user.setName("Gaurav");
        user.setEmail("gauravkundwani4@gmail.com");
        user.setToken("12345");
        String siteURL = "https://example.com";
        MimeMessage mimeMessage = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        userService.sendVerificationEmail(user, siteURL);
        verify(mailSender, times(1)).createMimeMessage();
    }
    @Test
    void verifyTest(){
        String token = "12345";
        PendingUser user = new PendingUser();
        user.setName("Gaurav");
        user.setEmail("gauravkundwani4@gmail.com");
        user.setToken(token);
        when(pendingUserRepository.findByToken(token)).thenReturn(user);
        boolean result = userService.verify(token);
        assertTrue(result);
        verify(pendingUserRepository, times(1)).delete(user);
    }

}