package com.example.Ewallet.services;

import com.example.Ewallet.collections.Cashback;
import com.example.Ewallet.collections.Transaction;
import com.example.Ewallet.collections.User;
import com.example.Ewallet.payloads.DownloadRequest;
import com.example.Ewallet.repositories.CashbackRepository;
import com.example.Ewallet.repositories.TransactionRepository;
import com.example.Ewallet.repositories.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class TransactionServiceTest {
    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserRepository userRepository;

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private CashbackRepository cashbackRepository;

    @InjectMocks
    private TransactionService transactionService;

    @Mock
    private JavaMailSender mailSender;

    @Test
    void addBalanceTest() {
        String email = "gauravkundwani4@gmail.com";
        double value = 100.0;
        User user = new User();
        user.setUserId("123");
        user.setName("Gaurav");
        user.setEmail("gauravkundwani4@gmail.com");
        user.setPassword(passwordEncoder.encode("Gaurav"));
        user.setWalletBalance((double) 100);
        user.setIncome((double) 100);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        transactionService.addBalance(value, email);
        verify(userRepository, times(1)).findByEmail(email);
        verify(userRepository, times(1)).save(user);

        assertEquals(200, user.getWalletBalance());
    }

    @Test
    void decreaseBalanceTest() {
        String email = "gauravkundwani4@gmail.com";
        double value = 100.0;
        User user = new User();
        user.setUserId("123");
        user.setName("Gaurav");
        user.setEmail("gauravkundwani4@gmail.com");
        user.setPassword(passwordEncoder.encode("Gaurav"));
        user.setWalletBalance((double) 200);
        user.setExpenses((double) 100);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        transactionService.decreaseBalance(value, email);
        verify(userRepository, times(1)).findByEmail(email);
        verify(userRepository, times(1)).save(user);
        assertEquals(100, user.getWalletBalance());
    }

    @Test
    void creditMailTest() throws MessagingException, UnsupportedEncodingException {
        Double value = 100.0;
        User sender = new User();
        sender.setName("Gaurav");
        sender.setEmail("gauravkundwani4@gmail.com");
        User receiver = new User();
        receiver.setName("Rahul");
        receiver.setEmail("kundwanirahul22@gmail.com");
        MimeMessage mimeMessage = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        transactionService.creditMail(value, receiver, sender);
        verify(mailSender, times(1)).createMimeMessage();
    }

    @Test
    void debitMailTest() throws MessagingException, UnsupportedEncodingException{
        Double value = 100.0;
        User sender = new User();
        sender.setName("Gaurav");
        sender.setEmail("gauravkundwani4@gmail.com");
        User receiver = new User();
        receiver.setName("Rahul");
        receiver.setEmail("kundwanirahul22@gmail.com");
        MimeMessage mimeMessage = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        transactionService.debitMail(value, receiver, sender);
        verify(mailSender, times(1)).createMimeMessage();
    }

    @Test
    void rechargeWalletTest() {
        Double value = 100.0;
        User user = new User();
        user.setName("Gaurav");
        user.setEmail("gauravkundwani4@gmail.com");
        user.setWalletBalance((double) 200);
        user.setIncome((double) 500);
        when(userRepository.save(user)).thenReturn(user);
        transactionService.rechargeWallet(value, user);
        assertEquals(300, user.getWalletBalance());
        verify(transactionRepository, times(1)).save(any(Transaction.class));
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void withdrawWalletTest() {
        Double value = 100.0;
        User user = new User();
        user.setName("Gaurav");
        user.setEmail("gauravkundwani4@gmail.com");
        user.setWalletBalance((double) 200);
        user.setExpenses((double) 500);
        when(userRepository.save(user)).thenReturn(user);
        transactionService.withdrawWallet(value, user);
        assertEquals(100, user.getWalletBalance());
        verify(transactionRepository, times(1)).save(any(Transaction.class));
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void createCreditTest() {
        Double value = 100.0;
        User sender = new User();
        sender.setUserId("1234");
        sender.setName("Gaurav");
        sender.setEmail("gauravkundwani4@gmail.com");
        User receiver = new User();
        receiver.setUserId("5678");
        receiver.setName("Rahul");
        receiver.setEmail("kundwanirahul22@gmail.com");
        Transaction transaction = new Transaction();
        transaction.setId("9123");
        transaction.setName("Gaurav");
        transaction.setAmount(value);
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);
        transactionService.createCredit(50.0, receiver, sender);
        verify(transactionRepository, times(1)).save(any(Transaction.class));
    }

    @Test
    void createDebitTest() {
        Double value = 100.0;
        User sender = new User();
        sender.setUserId("1234");
        sender.setName("Gaurav");
        sender.setEmail("gauravkundwani4@gmail.com");
        User receiver = new User();
        receiver.setUserId("5678");
        receiver.setName("Rahul");
        receiver.setEmail("kundwanirahul22@gmail.com");
        Transaction transaction = new Transaction();
        transaction.setId("9123");
        transaction.setName("Gaurav");
        transaction.setAmount(value);
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);
        transactionService.createDebit(50.0, sender, receiver);
        verify(transactionRepository, times(1)).save(any(Transaction.class));
    }

    @Test
    void transactionsTest() {
        String userId = "123";
        Transaction transaction1 = new Transaction();
        transaction1.setUserId(userId);
        Transaction transaction2 = new Transaction();
        transaction2.setUserId(userId);
        List<Transaction> mockTransactions = Arrays.asList(transaction1, transaction2);
        when(transactionRepository.findByUserId(userId)).thenReturn(mockTransactions);
        List<Transaction> result = transactionService.transactions(userId);
        assertEquals(mockTransactions, result);
        verify(transactionRepository, times(1)).findByUserId(userId);
    }

    @Test
    void downloadsTest() {
        String userId = "123";
        Transaction transaction1 = new Transaction();
        transaction1.setUserId(userId);
        transaction1.setId("1234");
        transaction1.setName("Robin");
        transaction1.setType("Received");
        transaction1.setAmount(500.0);

        Transaction transaction2 = new Transaction();
        transaction2.setUserId(userId);
        transaction2.setId("5678");
        transaction2.setName("Rahul");
        transaction2.setType("Transfer");
        transaction2.setAmount(500.0);

        List<Transaction> mockTransactions = Arrays.asList(transaction1, transaction2);
        when(transactionRepository.findByUserId(userId)).thenReturn(mockTransactions);
        List<DownloadRequest> result = transactionService.downloads(userId);
        assertEquals(result.size(), 2);
        verify(transactionRepository, times(1)).findByUserId(userId);
    }

    @Test
    void cashbackMailTest() throws MessagingException, UnsupportedEncodingException {
        Double value = 100.0;
        User user = new User();
        user.setName("Gaurav");
        user.setEmail("gauravkundwani4@gmail.com");
        MimeMessage mimeMessage = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        transactionService.cashbackMail(value, user);
        verify(mailSender, times(1)).createMimeMessage();
    }

    @Test
    void createCashbackTest() {
        Double value = 50.0;
        User user = new User();
        user.setUserId("123");
        user.setName("Gaurav");
        user.setEmail("gauravkundwani4@gmail.com");
        user.setWalletBalance(100.0);
        user.setIncome(150.0);
        user.setCashback((double) 0);
        Cashback cashback = new Cashback();
        cashback.setUserId("123");
        cashback.setAmount(value);
        when(userRepository.save(user)).thenReturn(user);
        when(cashbackRepository.save(any(Cashback.class))).thenReturn(cashback);
        transactionService.createCashback(value, user);
        assertEquals(150, user.getWalletBalance());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void cashbacksTest() {
        String userId = "123";
        Cashback cashback1 = new Cashback();
        cashback1.setUserId(userId);
        Cashback cashback2 = new Cashback();
        cashback2.setUserId(userId);
        List<Cashback> mockCashbacks = Arrays.asList(cashback1, cashback2);
        when(cashbackRepository.findByUserId(userId)).thenReturn(mockCashbacks);
        List<Cashback> result = transactionService.cashbacks(userId);
        assertEquals(mockCashbacks, result);
        verify(cashbackRepository, times(1)).findByUserId(userId);
    }

    @Test
    void rechargeMailTest() throws MessagingException, UnsupportedEncodingException {
        Double value = 100.0;
        User user = new User();
        user.setName("Gaurav");
        user.setEmail("gauravkundwani4@gmail.com");
        MimeMessage mimeMessage = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        transactionService.rechargeMail(value, user);
        verify(mailSender, times(1)).createMimeMessage();
    }

    @Test
    void withdrawMailTest() throws MessagingException, UnsupportedEncodingException {
        Double value = 100.0;
        User user = new User();
        user.setName("Gaurav");
        user.setEmail("gauravkundwani4@gmail.com");
        MimeMessage mimeMessage = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        transactionService.withdrawMail(value, user);
        verify(mailSender, times(1)).createMimeMessage();
    }
}