package vn.zalopay.project.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import vn.zalopay.project.Model.Review;
import vn.zalopay.project.Model.User;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    @Query("select u from User u")
    List<User> findAll();




    @Query("select u from User u  where u.id = ?1")
    User findOneWithUserID(Integer id);

    @Query("select u from User u where u.executiveID =?1 and u.managerID is null ")
    List<User> getListManagerE(Integer executiveID);

    @Query("select u from User u where u.executiveID is not null and u.managerID is not null ")
    List<User> getListWorker();

    @Query("select u from User u where u.managerID= ?1 ")
    List<User> getListWorkerM(Integer managerID);

    @Query("select u from User u where u.statusUser= 0 ")
    List<User> getWorkerInactive();




}
