package vn.zalopay.project.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import vn.zalopay.project.Model.Role;
import vn.zalopay.project.Model.User;
import vn.zalopay.project.Model.UserRole;
import vn.zalopay.project.Repository.RoleRepository;
import vn.zalopay.project.Repository.UserRepository;
import vn.zalopay.project.Repository.UserRoleRepository;

import java.util.HashSet;


@Component
public class DataSeedingListener implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent arg0) {
        // Roles
        if (roleRepository.findByRole("ROLE_ADMIN") == null) {
            roleRepository.save(new Role("ROLE_ADMIN"));
        }

        if (roleRepository.findByRole("ROLE_WORKER") == null) {
            roleRepository.save(new Role("ROLE_WORKER"));
        }

        if (roleRepository.findByRole("ROLE_MANAGER") == null) {
            roleRepository.save(new Role("ROLE_MANAGER"));
        }
        if (roleRepository.findByRole("ROLE_EXECUTIVE") == null) {
            roleRepository.save(new Role("ROLE_EXECUTIVE"));
        }

        // Admin account
        if (userRoleRepository.findByUserName("quangnghiauit") == null) {
            UserRole admin = new UserRole();
            admin.setUserName("quangnghiauit");
            admin.setPassword(passwordEncoder.encode("123456"));
            HashSet<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByRole("ROLE_ADMIN"));
            admin.setRoles(roles);
            userRoleRepository.save(admin);
        }

        // Member account
        if (userRoleRepository.findByUserName("executive") == null) {
            User dbUser = new User();
            dbUser.setFullname("executive manager");

            dbUser.setManagerID(null);
            dbUser.setExecutiveID(null);
            userRepository.save(dbUser);

            UserRole executive = new UserRole();
            executive.setUserName("executive");
            executive.setPassword(passwordEncoder.encode("123456"));
            executive.setUserID(dbUser.getUserID());
            HashSet<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByRole("ROLE_EXECUTIVE"));
            executive.setRoles(roles);
            userRoleRepository.save(executive);
        }
    }

}