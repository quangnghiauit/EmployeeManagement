package vn.zalopay.project.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import vn.zalopay.project.Model.UserRole;


@Repository
public interface UserRoleRepository extends MongoRepository<UserRole,String> {

    @Query("{ 'userID' : ?0 }")
    UserRole findById(Integer _id);

    UserRole findByUserName(String userName);

    @Query("{'userName':'?0'}")
    UserRole checkUserName(String userName);







}
