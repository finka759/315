package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {
    public List<User> getUsers();

    public Optional<User> getUserById(Long id);

    public void saveEditedUser(User user);

    public void deleteUser(Long id);

    public User findByUsername(String username);

    public boolean saveNewUser(User user);
}
