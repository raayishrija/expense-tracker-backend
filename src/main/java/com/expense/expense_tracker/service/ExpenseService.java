package com.expense.expense_tracker.service;

import com.expense.expense_tracker.dto.ExpenseRequest;
import com.expense.expense_tracker.model.Expense;
import com.expense.expense_tracker.model.User;
import com.expense.expense_tracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public List<Expense> getAllExpenses(User user) {
        return expenseRepository.findByUserOrderByDateDesc(user);
    }

    public List<Expense> getExpensesByCategory(User user, String category) {
        return expenseRepository.findByUserAndCategoryOrderByDateDesc(user, category);
    }

    public Expense addExpense(ExpenseRequest request, User user) {
        Expense expense = new Expense();
        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setDescription(request.getDescription());
        expense.setDate(request.getDate());
        expense.setUser(user);
        return expenseRepository.save(expense);
    }

    public Expense updateExpense(Long id, ExpenseRequest request, User user) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));
        if (!expense.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setDescription(request.getDescription());
        expense.setDate(request.getDate());
        return expenseRepository.save(expense);
    }

    public void deleteExpense(Long id, User user) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));
        if (!expense.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        expenseRepository.delete(expense);
    }
}
