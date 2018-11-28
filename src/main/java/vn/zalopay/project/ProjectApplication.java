package vn.zalopay.project;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import vn.zalopay.project.Model.Role;
import vn.zalopay.project.Repository.RoleRepository;

@SpringBootApplication
public class ProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectApplication.class, args);
    }

//    @Bean
//    CommandLineRunner init(RoleRepository roleRepository) {
//
//        return args -> {
//
//            Role adminRole = roleRepository.findByRole("ADMIN");
//            if (adminRole == null) {
//                Role newAdminRole = new Role();
//                newAdminRole.setRole("ADMIN");
//                roleRepository.save(newAdminRole);
//            }
//
//            Role executiveRole = roleRepository.findByRole("EXECUTIVE");
//            if (executiveRole == null) {
//                Role newUserRole = new Role();
//                newUserRole.setRole("EXECUTIVE");
//                roleRepository.save(newUserRole);
//            }
//            Role managerRole = roleRepository.findByRole("MANAGER");
//            if (managerRole == null) {
//                Role newUserRole = new Role();
//                newUserRole.setRole("MANAGER");
//                roleRepository.save(newUserRole);
//            }
//            Role workerRole = roleRepository.findByRole("WORKER");
//            if (workerRole == null) {
//                Role newUserRole = new Role();
//                newUserRole.setRole("WORKER");
//                roleRepository.save(newUserRole);
//            }
//
//        };
//
//    }
}
