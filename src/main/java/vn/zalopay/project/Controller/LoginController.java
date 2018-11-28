package vn.zalopay.project.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class LoginController {

    @RequestMapping(value = {"/"}, method = RequestMethod.GET)
    public String index() {

        return "index";
    }

//    @RequestMapping(value = "/login", method = RequestMethod.GET)
//    public String login(Model model) {
//
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//
//        //auth.getCredentials()
//        if (auth.getAuthorities().toString().equals("[ROLE_EXECUTIVE]")) {
//            return "index";
//        } else if (auth.getAuthorities().toString().equals("[ROLE_MANAGER]")) {
//            return "index";
//        } else if (auth.getAuthorities().toString().equals("[ROLE_WORKER]")) {
//            return "index";
//        }
//        return "index";
//    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);

        }
        return "redirect:/";
    }


}
