package vn.zalopay.project.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.zalopay.project.Model.Role;
import vn.zalopay.project.Model.User;
import vn.zalopay.project.Model.UserRole;
import vn.zalopay.project.Repository.ReviewRepository;
import vn.zalopay.project.Repository.RoleRepository;
import vn.zalopay.project.Repository.UserRepository;
import vn.zalopay.project.Repository.UserRoleRepository;
import vn.zalopay.project.Util.UserInformation;

import java.util.HashSet;
import java.util.List;

@Service
public class ExecutiveServiceImpl implements ExecutiveService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;


    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public List<User> getListManager(Integer id) {
        return userRepository.getListManagerE(id);
    }

    @Override
    public void add(UserInformation userInformation, Integer id) {

        //get information executive manager
        User userE = userRepository.findOneWithUserID(id);

        //set information manager(add)
        User userM = new User();
        userM.setFullname(userInformation.getFullname());
        userM.setEmail(userInformation.getEmail());
        userM.setTitle(userInformation.getTitle());
        userM.setDepartment(userInformation.getDepartment());

        userM.setManagerID(null);
        userM.setExecutiveID(id);
        userM = userRepository.save(userM);

        //set username and password manager
        UserRole userRoleM = new UserRole();
        userRoleM.setUserID(userM.getUserID());
        userRoleM.setUserName(userInformation.getUserName());
        userRoleM.setPassword(passwordEncoder.encode(userInformation.getPassword()));

        userRoleM.setRoles("ROLE_MANAGER");
        userRoleM = userRoleRepository.save(userRoleM);
    }

    @Override
    public void update(Integer id, User user) {
        // find information user by ID (oldUser) and save new information(newUser)
        User oldUser = userRepository.findOneWithUserID(id);

        oldUser.setFullname(user.getFullname());

        oldUser.setEmail(user.getEmail());
        oldUser.setBirthDate(user.getBirthDate());
        oldUser.setPhoneNumber(user.getPhoneNumber());
        oldUser.setGender(user.getGender());
        oldUser.setStartHire(user.getStartHire());
        oldUser.setAddress(user.getAddress());
        oldUser.setStatusUser(user.getStatusUser());
        oldUser.setDepartment(user.getDepartment());

        oldUser.setTitle(user.getTitle());
        oldUser.setManagerID(user.getManagerID());
        oldUser.setExecutiveID(user.getExecutiveID());

        oldUser = userRepository.save(oldUser);
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
    public List<?> getListWorkerReview(Integer id) {
        return reviewRepository.getListWorkerReview(id);
    }

    @Override
    public List<User> getWorkerInactive() {
        return userRepository.getWorkerInactive();
    }

    @Override
    public void updateStatusWorker(Integer id) {

        // find information user by ID (oldUser) and save new information(newUser)
        User oldUser = userRepository.findOneWithUserID(id);

        oldUser.setStatusUser(1);


        oldUser = userRepository.save(oldUser);
    }
}
