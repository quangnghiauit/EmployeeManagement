package vn.zalopay.project.Repository;

import org.springframework.data.repository.CrudRepository;

import vn.zalopay.project.Util.UserInformation;

public interface WorkerRepository extends CrudRepository<UserInformation, Integer> {


}
