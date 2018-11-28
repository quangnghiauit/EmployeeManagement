package vn.zalopay.project.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.zalopay.project.Model.User;
import vn.zalopay.project.Repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findOneWithUserID(Integer id) { return userRepository.findOneWithUserID(id);}






}
