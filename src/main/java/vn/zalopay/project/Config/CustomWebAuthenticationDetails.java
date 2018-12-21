package vn.zalopay.project.Config;
import javax.servlet.http.HttpServletRequest;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public class CustomWebAuthenticationDetails extends WebAuthenticationDetails {

    private String username;
    private String password;

    public CustomWebAuthenticationDetails(HttpServletRequest request) {
        super(request);

        username = request.getParameter("username");
        password = request.getParameter("password");
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
