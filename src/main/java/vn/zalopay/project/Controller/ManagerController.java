package vn.zalopay.project.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import vn.zalopay.project.Model.Review;
import vn.zalopay.project.Model.User;
import vn.zalopay.project.Service.ManagerService;

import vn.zalopay.project.Util.UserInformation;

import java.util.List;


@Controller
//@RequestMapping(value = "/manager")

public class ManagerController {

    @Autowired
    private ManagerService managerService;

    @RequestMapping(value = "/getListWorker/{id}", method = RequestMethod.GET)
    public @ResponseBody
    List<User> getListWorker(@PathVariable Integer id) {

        return managerService.getListWorker(id);
    }

    @RequestMapping(value = "/addworker/{id}", method = RequestMethod.POST)
    public @ResponseBody
    void addWorker(@RequestBody UserInformation userInformation, @PathVariable Integer id) {
        managerService.add(userInformation, id);
    }

    @RequestMapping(value = "/deleteworker/{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    void delete(@PathVariable Integer id) {

        managerService.delete(id);
    }

    @RequestMapping(value = "/reviewWorkerM/{id}", method = RequestMethod.POST)
    public @ResponseBody
    void reviewWorkerM(@PathVariable Integer id, @RequestBody Review review) {
        managerService.review(id,review);

    }

    @RequestMapping(value = "/updatestatusworkeraction/{id}", method = RequestMethod.PUT)
    public @ResponseBody
    void updatestatusworker( @PathVariable Integer id) {
        managerService.updateStatusWorker(id);

    }

    @RequestMapping(value = "/getAllWorker", method = RequestMethod.GET)
    public @ResponseBody
    List<User> getAllWorker() {

        return managerService.getAllWorker();
    }

}
