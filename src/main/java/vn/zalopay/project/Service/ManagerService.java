package vn.zalopay.project.Service;

import vn.zalopay.project.Model.Review;
import vn.zalopay.project.Model.User;
import vn.zalopay.project.Util.UserInformation;

import java.util.List;
import java.util.Optional;

public interface ManagerService {

    Iterable<User> findAll();

    Optional<User> findOne(Integer id);
    List<User> getListWorker(Integer id);
    void add(UserInformation userInformation,Integer id);
    void deleteMongo(Integer id);
    void delete(Integer id);

    void review(Integer id, Review review);
    void updateStatusWorker(Integer id);
}
