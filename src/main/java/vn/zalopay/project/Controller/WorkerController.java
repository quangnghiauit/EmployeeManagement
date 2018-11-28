package vn.zalopay.project.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import vn.zalopay.project.Model.Review;
import vn.zalopay.project.Model.User;
import vn.zalopay.project.Model.UserRole;
import vn.zalopay.project.Repository.UserRepository;
import vn.zalopay.project.Repository.UserRoleRepository;
import vn.zalopay.project.Service.UserRoleService;
import vn.zalopay.project.Service.WorkerService;
import vn.zalopay.project.Util.UserInformation;

import java.util.List;

@Controller
//@RequestMapping("/worker")
public class WorkerController {

    @Autowired
    private WorkerService workerService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleService userRoleService;

    @Autowired
    private UserRoleRepository userRoleRepository;


    @RequestMapping(value = "/worker/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> getInformationUser(@PathVariable Integer id) {

        ResponseEntity<User> user = new ResponseEntity<>(userRepository.findOneWithUserID(id), HttpStatus.OK);
        return user;
    }

    @RequestMapping(value = "/updateworker/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    void updateWorker(@RequestBody User user, @PathVariable Integer id) {
        workerService.update(id, user);

    }


    @RequestMapping(value = "/accounts", method = RequestMethod.POST)
    public @ResponseBody
    UserRole updateAccount(@RequestParam("username") String userName) {
        return userRoleService.update(userRoleRepository.findByUserName(userName));

    }

    @RequestMapping(value = "/getID/{userName}", method = RequestMethod.GET)
    public ResponseEntity<Integer> getUserID(@PathVariable String userName) {
        UserRole userRole = userRoleRepository.findByUserName(userName);
        ResponseEntity<Integer> userID = new ResponseEntity<>(userRole.getUserID(), HttpStatus.OK);
        return userID;
    }

    @RequestMapping(value = "/listworker/{id}", method = RequestMethod.GET)
    public @ResponseBody
    List<User> getListWorker(@PathVariable Integer id) {

        return workerService.getListWorker(id);
    }


    @RequestMapping(value = "/reviewWorker/{id}", method = RequestMethod.POST)
    public @ResponseBody
    void reviewWorker(@PathVariable Integer id, @RequestBody Review review) {
        workerService.review(id,review);

    }




}
