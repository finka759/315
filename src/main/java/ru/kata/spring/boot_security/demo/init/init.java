package ru.kata.spring.boot_security.demo.init;

import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.annotation.PostConstruct;
import java.util.List;

@Component
public class init {
    private final RoleRepository roleRepository;
    private final UserService userService;

    public init(RoleRepository roleRepository, UserService userService) {
        this.roleRepository = roleRepository;
        this.userService = userService;
    }

    @PostConstruct
    private void postConstruct() {
        Role admin = new Role();
        admin.setId(1L);
        admin.setName("ROLE_ADMIN");
        Role user = new Role();
        user.setId(2L);
        user.setName("ROLE_USER");
        roleRepository.saveAll(List.of(admin, user));
        User adminUser = new User();
        adminUser.setFirstname("FnAdmin");
        adminUser.setLastname("LnAdmin");
        adminUser.setAge((short) 24);
        adminUser.setUsername("admin@em");
        adminUser.setPassword("111");
        adminUser.addRole(admin);
        adminUser.addRole(user);
        User normalUser = new User();
        normalUser.setFirstname("FnUser");
        normalUser.setLastname("LnUser");
        normalUser.setAge((short) 18);
        normalUser.setUsername("user@em");
        normalUser.setPassword("111");
        normalUser.addRole(user);
        userService.saveNewUser(adminUser);
        userService.saveNewUser(normalUser);
    }
}