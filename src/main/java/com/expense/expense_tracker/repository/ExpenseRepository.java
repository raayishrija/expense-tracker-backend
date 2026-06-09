package com.expense.expense_tracker.repository;

import com.expense.expense_tracker.model.Expense;
import com.expense.expense_tracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUserOrderByDateDesc(User user);
    List<Expense> findByUserAndCategoryOrderByDateDesc(User user, String category);
}
