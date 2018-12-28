package vn.zalopay.project.Service;

import org.redisson.Redisson;
import org.redisson.api.RBucket;
import org.redisson.api.RList;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
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


import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;

@Service
public class ExecutiveServiceImpl implements ExecutiveService {



    private static RedissonClient client;

    @PostConstruct
    public  void setUp() throws IOException {

        Config config = new Config();
        config.useSingleServer()
                .setAddress("127.0.0.1:6379");
        client= Redisson.create(config);
    }



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
        //simulateSlowService();
        RBucket<Object> bucket = client.getBucket("ListManager" + id);
        if(!bucket.isExists()) {
            List<User> userList = userRepository.getListManagerE(id);
            bucket.set(userList);
        }

        return (List<User>) bucket.get();
    }
    public  List<User> getListManagerCache(String key){
        RBucket<List<User>> bucket = client.getBucket(key);
        List<User> userList = bucket.get();
        return userList;

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
        RBucket<Object> bucket= client.getBucket("ListWorkerReview"+id);
        if(!bucket.isExists()) {
            List<?> workerListReview = reviewRepository.getListWorkerReview(id);
            bucket.set(workerListReview);
        }
        return (List<?>) bucket.get();
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


    private void simulateSlowService() {
        try{
            Thread.sleep(3000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
