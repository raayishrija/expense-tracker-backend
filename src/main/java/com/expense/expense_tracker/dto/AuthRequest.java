package com.expense.expense_tracker.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String password;
}
