package vn.zalopay.project.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.zalopay.project.Model.Review;
import vn.zalopay.project.Model.User;
import vn.zalopay.project.Model.UserRole;
import vn.zalopay.project.Repository.ReviewRepository;
import vn.zalopay.project.Repository.UserRepository;
import vn.zalopay.project.Repository.UserRoleRepository;
import vn.zalopay.project.Util.UserInformation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WorkerServiceImpl implements WorkerService{

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private UserRoleRepository userRoleRepository;
    @Autowired
    private ReviewRepository reviewRepository;


    @Override
    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findOne(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> getListWorker(Integer id) {
        User user = userRepository.findOneWithUserID(id);
        return userRepository.getListWorkerM(user.getManagerID());
    }

    @Override
    public void update(Integer id, User user) {

        // find information user by ID (oldUser) and save new information(newUser)
        User oldUser = userRepository.findOneWithUserID(id);

        oldUser.setFullname(user.getFullname());
        oldUser.setBirthDate(user.getBirthDate());

        oldUser.setGender(user.getGender());
        oldUser.setAddress(user.getAddress());
        oldUser.setPhoneNumber(user.getPhoneNumber());
        oldUser.setEmail(user.getEmail());

        oldUser.setStartHire(user.getStartHire());


        oldUser.setDepartment(user.getDepartment());

        oldUser.setTitle(user.getTitle());


        oldUser=userRepository.save(oldUser);
    }

    @Override
    public void review(Integer id, Review review) {

        Review dbReview = new Review();
        dbReview.setUserReviewID(id);
        dbReview.setUserReceivedID(review.getUserReceivedID());
        dbReview.setRating(review.getRating());
        dbReview.setNote(review.getNote());
        dbReview= reviewRepository.save(dbReview);

    }


}
