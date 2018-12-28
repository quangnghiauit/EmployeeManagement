package vn.zalopay.project.Service;

import vn.zalopay.project.Model.Review;
import vn.zalopay.project.Model.User;
import vn.zalopay.project.Util.UserInformation;

import java.util.List;

public interface ExecutiveService {

    List<User> getListManager(Integer id);
    List<User> getListManagerCache(String key);
    void add(UserInformation userInformation,Integer id);
    void update(Integer id, User newUser);
    void deleteMongo(Integer id);
    void delete(Integer id);
    List<?> getListWorkerReview(Integer id);
    List<User> getWorkerInactive();
    void updateStatusWorker(Integer id);
}
