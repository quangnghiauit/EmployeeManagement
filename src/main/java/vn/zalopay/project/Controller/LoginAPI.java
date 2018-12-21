package vn.zalopay.project.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import vn.zalopay.project.Config.CustomWebAuthenticationDetails;
import vn.zalopay.project.Model.UserRole;
import vn.zalopay.project.Repository.UserRoleRepository;

@CrossOrigin
@RestController
public class LoginAPI {

    @Autowired
    private UserRoleRepository userRoleRepository;



    protected CustomWebAuthenticationDetails getUserSession() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null ? (CustomWebAuthenticationDetails) auth.getDetails() : null;
    }


    @CrossOrigin
    @RequestMapping(value = "/api/getID", method = RequestMethod.GET)
    public ResponseEntity<?> getUserID() {
        CustomWebAuthenticationDetails user = getUserSession();
        String userName = "";
        if (user != null) {
            userName = user.getUsername();
        }
        UserRole userRole = userRoleRepository.findByUserName(userName);
        ResponseEntity<?> userID = new ResponseEntity<>(userRole, HttpStatus.OK);
        return userID;

    }


    @CrossOrigin
    @RequestMapping(value = "/api/role",method = RequestMethod.GET)
    public ResponseEntity<String>  roles() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return  new ResponseEntity<>(authentication.getAuthorities().toString(), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping(value = "/api/auth")
    public ResponseEntity<String> auth() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        System.out.println("\n\n\n\n\n\n"+auth+"\n\n\n\n\n\n\n");
        //auth.getCredentials()

        return new ResponseEntity<String>(auth.getAuthorities().toString(),HttpStatus.OK);

    }


}
