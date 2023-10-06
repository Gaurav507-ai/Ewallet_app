package com.example.Ewallet.services;

import com.example.Ewallet.collections.Cashback;
import com.example.Ewallet.payloads.DownloadRequest;
import com.example.Ewallet.collections.Transaction;
import com.example.Ewallet.collections.User;
import com.example.Ewallet.repositories.CashbackRepository;
import com.example.Ewallet.repositories.TransactionRepository;
import com.example.Ewallet.repositories.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CashbackRepository cashbackRepository;


    @Transactional
    public void addBalance(Double value, String email){
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Double currentBalance = user.getWalletBalance();
        user.setIncome(user.getIncome() + value);
        user.setWalletBalance(currentBalance + value);
        userRepository.save(user);
    }

    @Transactional
    public void decreaseBalance(Double value, String email){
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Double currentBalance = user.getWalletBalance();
        user.setWalletBalance(currentBalance - value);
        user.setExpenses(user.getExpenses() + value);
        userRepository.save(user);
    }

    public void creditMail(Double value, User receiver, User sender) throws MessagingException, UnsupportedEncodingException {
        String subject = "Account credited with Rs. " + value;
        String senderName = "Ewallet team";
        String mailContent = "<p>Dear " + receiver.getName() + ",</p>";
        mailContent += "<p>Your account is credited with Rs. " + value + " From " + sender.getName() + "</p>";
        mailContent += "<p>Thank You<br>The Ewallet Team</p>";
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("walletbanker027@gmail.com", senderName);
        helper.setTo(receiver.getEmail());
        helper.setSubject(subject);
        helper.setText(mailContent, true);
        mailSender.send(message);
    }

    public void debitMail(Double value, User sender, User receiver) throws MessagingException, UnsupportedEncodingException{
        String subject = "Account debited with Rs. " + value;
        String senderName = "Ewallet team";
        String mailContent = "<p>Dear " + sender.getName() + ",</p>";
        mailContent += "<p>Your account is debited with Rs. " + value + " to " + receiver.getName() + "</p>";
        mailContent += "<p>Thank You<br>The Ewallet Team</p>";
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("walletbanker027@gmail.com", senderName);
        helper.setTo(sender.getEmail());
        helper.setSubject(subject);
        helper.setText(mailContent, true);
        mailSender.send(message);
    }

    @Transactional
    public void rechargeWallet(Double value, User user){
        user.setWalletBalance(user.getWalletBalance() + value);
        user.setIncome(user.getIncome() + value);
        Transaction transaction = new Transaction();
        transaction.setId(generateUniqueId());
        transaction.setAmount(value);
        transaction.setUserId(user.getUserId());
        transaction.setType("Recharge");
        transaction.setName("Bank");
        transaction.setDate(LocalDate.now());
        transaction.setDescription("Received from Bank");
        userRepository.save(user);
        transactionRepository.save(transaction);
    }

    @Transactional
    public void withdrawWallet(Double value, User user){
        user.setWalletBalance(user.getWalletBalance() - value);
        user.setExpenses(user.getExpenses() + value);
        Transaction transaction = new Transaction();
        transaction.setId(generateUniqueId());
        transaction.setAmount(value);
        transaction.setUserId(user.getUserId());
        transaction.setType("Withdraw");
        transaction.setName("Bank");
        transaction.setDate(LocalDate.now());
        transaction.setDescription("Transfer to Bank");
        transactionRepository.save(transaction);
        userRepository.save(user);
    }

    public void createCredit(Double value, User reciever, User sender){
        Transaction transaction = new Transaction();
        transaction.setAmount(value);
        transaction.setId(generateUniqueId());
        transaction.setType("Received");
        transaction.setDate(LocalDate.now());
        transaction.setUserId(reciever.getUserId());
        transaction.setName(sender.getName());
        transaction.setDescription("Received from " + sender.getName());
        transactionRepository.save(transaction);
    }

    public void createDebit(Double value, User sender, User reciever){
        Transaction transaction = new Transaction();
        transaction.setAmount(value);
        transaction.setId(generateUniqueId());
        transaction.setType("Transfer");
        transaction.setDate(LocalDate.now());
        transaction.setUserId(sender.getUserId());
        transaction.setName(reciever.getName());
        transaction.setDescription("Transfer to " + reciever.getName());
        transactionRepository.save(transaction);
    }

    private String generateUniqueId(){
        String randomCode = RandomString.make(5);
        if(transactionRepository.existsById(randomCode)){
            return generateUniqueId();
        }
        return randomCode;
    }
    private String generateUniqueIdCashback(){
        String randomCode = RandomString.make(5);
        if(cashbackRepository.existsById(randomCode)){
            return generateUniqueIdCashback();
        }
        return randomCode;
    }

    public List<Transaction> transactions(String userId){
        return transactionRepository.findByUserId(userId);
    }

    public List<DownloadRequest> downloads(String userId){
        List<Transaction> transactions = transactionRepository.findByUserId(userId);
        List<DownloadRequest> list = new ArrayList<>();
        for(Transaction transaction : transactions){
            DownloadRequest downloadRequest = new DownloadRequest();
            downloadRequest.setTid(transaction.getId());
            downloadRequest.setAmount(transaction.getAmount());
            downloadRequest.setDescription(transaction.getDescription());
            downloadRequest.setDate(transaction.getDate());
            downloadRequest.setType(transaction.getType());
            list.add(downloadRequest);
        }
        return list;
    }

    public void cashbackMail(Double value, User user) throws MessagingException, UnsupportedEncodingException{
        String subject = "Received cashback of Rs. " + value;
        String senderName = "Ewallet team";
        String mailContent = "<p>Dear " + user.getName() + ",</p>";
        mailContent += "<p>You got a cashback of Rs. " + value + " in your Ewallet account</p>";
        mailContent += "<p>Thank You<br>The Ewallet Team</p>";
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("walletbanker027@gmail.com", senderName);
        helper.setTo(user.getEmail());
        helper.setSubject(subject);
        helper.setText(mailContent, true);
        mailSender.send(message);
    }

    @Transactional
    public void createCashback(Double value, User user) {
        user.setCashback(user.getCashback() + value);
        user.setWalletBalance(user.getWalletBalance() + value);
        Cashback cashback = new Cashback();
        cashback.setId(generateUniqueIdCashback());
        cashback.setUserId(user.getUserId());
        cashback.setAmount(value);
        cashback.setDescription("Received from Ewallet");
        cashback.setDate(LocalDate.now());
        userRepository.save(user);
        cashbackRepository.save(cashback);
    }

    public List<Cashback> cashbacks(String userId){
        return cashbackRepository.findByUserId(userId);
    }

    public void rechargeMail(Double value, User user) throws MessagingException, UnsupportedEncodingException{
        String subject = "Recharge of Rs. " + value;
        String senderName = "Ewallet team";
        String mailContent = "<p>Dear " + user.getName() + ",</p>";
        mailContent += "<p>Recharge of Rs. " + value + " has done in your Ewallet account</p>";
        mailContent += "<p>Thank You<br>The Ewallet Team</p>";
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("walletbanker027@gmail.com", senderName);
        helper.setTo(user.getEmail());
        helper.setSubject(subject);
        helper.setText(mailContent, true);
        mailSender.send(message);
    }

    public void withdrawMail(Double value, User user) throws MessagingException, UnsupportedEncodingException{
        String subject = "Withdraw of Rs. " + value;
        String senderName = "Ewallet team";
        String mailContent = "<p>Dear " + user.getName() + ",</p>";
        mailContent += "<p>Withdraw of Rs. " + value + " has done from your Ewallet account</p>";
        mailContent += "<p>Thank You<br>The Ewallet Team</p>";
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("walletbanker027@gmail.com", senderName);
        helper.setTo(user.getEmail());
        helper.setSubject(subject);
        helper.setText(mailContent, true);
        mailSender.send(message);
    }
}
