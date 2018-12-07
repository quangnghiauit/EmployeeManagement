package vn.zalopay.project.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sun.security.krb5.internal.ccache.CredentialsCache;
import vn.zalopay.project.Model.Review;
import vn.zalopay.project.Model.Role;
import vn.zalopay.project.Model.User;
import vn.zalopay.project.Model.UserRole;
import vn.zalopay.project.Repository.ReviewRepository;
import vn.zalopay.project.Repository.RoleRepository;
import vn.zalopay.project.Repository.UserRepository;
import vn.zalopay.project.Repository.UserRoleRepository;
import vn.zalopay.project.Util.UserInformation;

import javax.jws.soap.SOAPBinding;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class ManagerServiceImpl implements ManagerService {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
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

        return userRepository.getListWorkerM(id);
    }

    @Override
    public void add(UserInformation userInformation, Integer id) {

        //get information manager
        User userM = userRepository.findOneWithUserID(id);

        //set information worker(add)
        User userW= new User();
        userW.setFullname(userInformation.getFullname());
        userW.setEmail(userInformation.getEmail());
        userW.setTitle(userInformation.getTitle());
        userW.setDepartment(userInformation.getDepartment());
        userW.setStatusUser(0);
        userW.setStatusAction(0);
        userW.setManagerID(userM.getUserID());
        userW.setExecutiveID(userM.getExecutiveID());
        userW=userRepository.save(userW);

        //set username and password worker
        UserRole userRoleW= new UserRole();
        userRoleW.setUserID(userW.getUserID());
        userRoleW.setUserName(userInformation.getUserName());
        userRoleW.setPassword(passwordEncoder.encode(userInformation.getPassword()));

        userRoleW.setRoles("ROLE_WORKER");
        userRoleW=userRoleRepository.save(userRoleW);
    }

    public void deleteMongo(Integer id) {
        userRoleRepository.delete(userRoleRepository.findById(id));
    }
    @Override
    public void delete(Integer id) {
        userRepository.deleteById(id);
        deleteMongo(id);

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

    @Override
    public void updateStatusWorker(Integer id) {

        // find information user by ID (oldUser) and save new information(newUser)
        User oldUser = userRepository.findOneWithUserID(id);

        oldUser.setStatusUser(0);
        oldUser.setStatusAction(1);


        oldUser = userRepository.save(oldUser);
    }
}
