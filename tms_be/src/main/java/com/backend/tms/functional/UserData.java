package com.backend.tms.functional;

import com.backend.tms.model.User;
@FunctionalInterface
public interface UserData {
    public User get(String email);
}
