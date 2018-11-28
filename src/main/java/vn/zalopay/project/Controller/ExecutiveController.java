package vn.zalopay.project.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import vn.zalopay.project.Model.User;
import vn.zalopay.project.Repository.UserRepository;
import vn.zalopay.project.Service.ExecutiveService;
import vn.zalopay.project.Util.UserInformation;

import javax.jws.soap.SOAPBinding;
import java.util.List;


@Controller
//@RequestMapping(value = "/executive")
public class ExecutiveController {

    @Autowired
    private ExecutiveService executiveService;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/manager/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> getInformationUser(@PathVariable Integer id) {

        ResponseEntity<User> user = new ResponseEntity<>(userRepository.findOneWithUserID(id), HttpStatus.OK);
        return user;
    }

    @RequestMapping(value = "/getListManager/{id}", method = RequestMethod.GET)
    public @ResponseBody
    List<User> getListManager(@PathVariable Integer id) {

        return executiveService.getListManager(id);
    }

    @RequestMapping(value = "/addmanager/{id}", method = RequestMethod.POST)
    public @ResponseBody
    void addManager(@RequestBody UserInformation userInformation, @PathVariable Integer id) {
        executiveService.add(userInformation, id);
    }


    @RequestMapping(value = "/updatemanager/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    void updateWorker(@RequestBody User user, @PathVariable Integer id) {
        executiveService.update(id, user);

    }


    @RequestMapping(value = "/deletemanager/{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    void delete(@PathVariable Integer id) {

        executiveService.delete(id);
    }

    @RequestMapping(value = "/getListWorkerReview/{id}", method = RequestMethod.GET)
    public @ResponseBody
    List<?> getListWorkerReview(@PathVariable Integer id) {

        return executiveService.getListWorkerReview(id);
    }
    @RequestMapping(value = "/getWorkerInactive", method = RequestMethod.GET)
    public @ResponseBody
    List<User> getWorkerInactive() {

        return executiveService.getWorkerInactive();
    }

    @RequestMapping(value = "/updatestatusworker/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    void updatestatusworker( @PathVariable Integer id) {
        executiveService.updateStatusWorker(id);

    }


}
