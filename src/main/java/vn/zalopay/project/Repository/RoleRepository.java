package vn.zalopay.project.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import vn.zalopay.project.Model.Role;

public interface RoleRepository extends MongoRepository<Role,String> {
    Role findByRole(String role);
}

