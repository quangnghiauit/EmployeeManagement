package vn.zalopay.project.Service;

import vn.zalopay.project.Model.User;

public interface UserService {

    User findOneWithUserID(Integer id);
}
