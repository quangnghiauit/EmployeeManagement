package vn.zalopay.project.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.zalopay.project.Model.Role;
import vn.zalopay.project.Model.UserRole;
import vn.zalopay.project.Repository.RoleRepository;
import vn.zalopay.project.Repository.UserRoleRepository;

import java.util.*;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
   @Autowired
    private UserRoleRepository userRoleRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserRole userRole = userRoleRepository.findByUserName(username);
        if (userRole == null) {
            throw new UsernameNotFoundException("User not found");
        }

        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        Set<Role> roles = userRole.getRoles();
        for (Role role : roles) {
            grantedAuthorities.add(new SimpleGrantedAuthority(role.getRole()));
        }

        return new org.springframework.security.core.userdetails.User(
                userRole.getUserName(), userRole.getPassword(), grantedAuthorities);
    }
}
