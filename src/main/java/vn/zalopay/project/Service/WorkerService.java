package vn.zalopay.project.Service;


import vn.zalopay.project.Model.Review;
import vn.zalopay.project.Model.User;
import vn.zalopay.project.Util.UserInformation;

import java.util.List;
import java.util.Optional;


public interface WorkerService {
    Iterable<User> findAll();
    Optional<User> findOne(Integer id);

    List<User> getListWorker(Integer id);

    void update(Integer id, User user);

    void review(Integer id, Review review);


}
