package com.example.demo.services;

import com.example.demo.collections.User;
import com.example.demo.exceptions.UserAlreadyExistException;
import com.example.demo.repositories.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDetails user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("User not found"));
        return user;
    }

    public List<User> getUsers(){
        return this.userRepository.findAll();
    }

    public  User getUserByEmail(String email){
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User createUser(User user){
        List<User> users = userRepository.findAll();
        for(User user1 : users){
            if(user.getEmail().equals(user1.getEmail())){
                throw new UserAlreadyExistException("User already exist");
            }
        }
        user.setUserId(generateUniqueUserId());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRegistrationDate(new Date());
        user.setWalletBalance((double) 0);
        user.setEnabled(false);
        user.setIncome((double) 0);
        user.setExpenses((double) 0);
        String randomCode = RandomString.make(64);
        user.setVerificationCode(randomCode);
        return userRepository.save(user);
    }

    public void sendVerificationEmail (User user, String siteURL) throws MessagingException, UnsupportedEncodingException {
        String subject = "Please verify your registration";
        String senderName = "Ewallet team";
        String mailContent = "<p>Dear " + user.getName() + ",</p>";
        mailContent += "<p>Please click the link below to verify your registration:</p>";
        String verifyURL = siteURL + "/auth/verify?code=" + user.getVerificationCode();
        mailContent += "<h3><a href=\"" + verifyURL + "\">VERIFY</a></h3>";
        mailContent += "<p>Thank You<br>The Ewallet Team</p>";
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("walletbanker027@gmail.com", senderName);
        helper.setTo(user.getEmail());
        helper.setSubject(subject);
        helper.setText(mailContent, true);
        mailSender.send(message);
    }

    public boolean verify(String verificationCode){
        User user = userRepository.findByVerificationCode(verificationCode);
        if(user == null ){
            return false;
        }
        else{
            user.setEnabled(true);
            userRepository.save(user);
            return user.isEnabled();
        }
    }

    private String generateUniqueUserId(){
        String uuid = UUID.randomUUID().toString();
        if(userRepository.existsById(uuid)){
            return generateUniqueUserId();
        }
        return uuid;
    }
}
