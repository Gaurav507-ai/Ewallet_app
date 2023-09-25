package com.example.demo.controllers;

import com.example.demo.collections.*;
import com.example.demo.exceptions.AmountNotAvailableException;
import com.example.demo.payloads.AmountRequest;
import com.example.demo.payloads.DownloadRequest;
import com.example.demo.security.JwtHelper;
import com.example.demo.services.TransactionService;
import com.example.demo.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@RequestMapping("/wallet")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtHelper jwtHelper;


    @PostMapping("/transfer")
    public String transactionTransfer(@RequestBody AmountRequest amountRequest, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        String email = amountRequest.getEmail();
        Double value = amountRequest.getAmount();
        User receiver = userService.getUserByEmail(email);
        String requestHeader = request.getHeader("Authorization");
        String token = requestHeader.substring(7);
        String username = this.jwtHelper.getUsernameFromToken(token);
        User sender = userService.getUserByEmail(username);
        if(sender.getEmail().equals(receiver.getEmail())){
            return "Insert receiver's email";
        }
        if(sender.getWalletBalance()<value){
            throw new AmountNotAvailableException("Amount not available in wallet");
        }
        transactionService.addBalance(value, email);
        transactionService.decreaseBalance(value, sender.getUsername());
        transactionService.creditMail(value, receiver, sender);
        transactionService.debitMail(value, sender, receiver);
        transactionService.createCredit(value, receiver,sender);
        transactionService.createDebit(value, sender, receiver);
        return "Transfer Successfull";
    }

    @PutMapping("/recharge")
    public String recharge(@RequestParam("value") Double value, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        String requestHeader = request.getHeader("Authorization");
        String token = requestHeader.substring(7);
        String username = this.jwtHelper.getUsernameFromToken(token);
        User user = userService.getUserByEmail(username);
        transactionService.rechargeWallet(value, user);
        transactionService.rechargeMail(value, user);
        Double cashback = value/10;
        if(cashback>150.0){
            cashback = 150.0;
        }
        transactionService.createCashback(cashback, user);
        transactionService.cashbackMail(cashback, user);
        return "Recharge Successfull";
    }

    @PutMapping("/withdraw")
    public String withdraw(@RequestParam("value") Double value, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException{
        String requestHeader = request.getHeader("Authorization");
        String token = requestHeader.substring(7);
        String username = this.jwtHelper.getUsernameFromToken(token);
        User user = userService.getUserByEmail(username);
        if(user.getWalletBalance()<value){
            throw new AmountNotAvailableException("Amount not available");
        }
        transactionService.withdrawWallet(value, user);
        transactionService.withdrawMail(value, user);
        return "Withdraw Successfull";
    }

    @GetMapping("/transactions")
    public List<Transaction> transactionList(HttpServletRequest request){
        String requestHeader = request.getHeader("Authorization");
        String token = requestHeader.substring(7);
        String username = this.jwtHelper.getUsernameFromToken(token);
        User user = userService.getUserByEmail(username);
        return transactionService.transactions(user.getUserId());
    }

    @GetMapping("/download")
    public List<DownloadRequest> downloadList(HttpServletRequest request){
        String requestHeader = request.getHeader("Authorization");
        String token = requestHeader.substring(7);
        String username = this.jwtHelper.getUsernameFromToken(token);
        User user = userService.getUserByEmail(username);
        return transactionService.downloads(user.getUserId());
    }

    @GetMapping("/cashback")
    public List<Cashback> cashbackList(HttpServletRequest request){
        String requestHeader = request.getHeader("Authorization");
        String token = requestHeader.substring(7);
        String username = this.jwtHelper.getUsernameFromToken(token);
        User user = userService.getUserByEmail(username);
        return transactionService.cashbacks(user.getUserId());
    }
}
