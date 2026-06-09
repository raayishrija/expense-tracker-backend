package com.expense.expense_tracker.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class HealthController {
    @GetMapping("/health")
    public String health() {
        return "Expense Tracker API is running!";
    }
}
