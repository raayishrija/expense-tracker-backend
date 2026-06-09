package com.expense.expense_tracker.controller;

import com.expense.expense_tracker.dto.ExpenseRequest;
import com.expense.expense_tracker.model.Expense;
import com.expense.expense_tracker.model.User;
import com.expense.expense_tracker.service.ExpenseService;
import com.expense.expense_tracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private UserService userService;

    private User getCurrentUser(UserDetails userDetails) {
        return userService.findByUsername(userDetails.getUsername());
    }

    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) String category) {
        User user = getCurrentUser(userDetails);
        if (category != null && !category.isEmpty()) {
            return ResponseEntity.ok(expenseService.getExpensesByCategory(user, category));
        }
        return ResponseEntity.ok(expenseService.getAllExpenses(user));
    }

    @PostMapping
    public ResponseEntity<Expense> addExpense(
            @RequestBody ExpenseRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = getCurrentUser(userDetails);
        return ResponseEntity.ok(expenseService.addExpense(request, user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(
            @PathVariable Long id,
            @RequestBody ExpenseRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = getCurrentUser(userDetails);
        return ResponseEntity.ok(expenseService.updateExpense(id, request, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = getCurrentUser(userDetails);
        expenseService.deleteExpense(id, user);
        return ResponseEntity.ok("Expense deleted");
    }
}
