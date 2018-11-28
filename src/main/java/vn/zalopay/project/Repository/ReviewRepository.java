package vn.zalopay.project.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import vn.zalopay.project.Model.Review;
import vn.zalopay.project.Model.User;

import java.util.List;

@Repository
public interface ReviewRepository extends CrudRepository<Review,Integer>  {
    @Query(value = "select r from Review r  where r.userReviewID= ?1 ")
    List<Review> getListWorkerReview(Integer managerID);


    @Query(value = "select r from Review r inner join User u where r.reviewID=u.userID and u.managerID= ?1 ")
    List<Review> getListWorkerReviewManager(Integer managerID);
}
