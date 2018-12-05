package vn.zalopay.project;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.converter.json.GsonHttpMessageConverter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import vn.zalopay.project.Model.Role;
import vn.zalopay.project.Model.User;
import vn.zalopay.project.Model.UserRole;
import vn.zalopay.project.Repository.ReviewRepository;
import vn.zalopay.project.Repository.RoleRepository;
import vn.zalopay.project.Repository.UserRepository;
import vn.zalopay.project.Repository.UserRoleRepository;
import vn.zalopay.project.Util.UserInformation;


import java.io.*;
import java.util.HashSet;
import java.util.List;


@RunWith(SpringRunner.class)
public class ProjectApplicationTests {

//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private RoleRepository roleRepository;
//
//
//    @Autowired
//    private UserRoleRepository userRoleRepository;
//
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;


    public void add() throws JsonProcessingException {

        for(int i = 1 ; i<1000000;i++) {
            ObjectMapper mapper = new ObjectMapper();

            //set information manager(add)
            User userM = new User();
            userM.setUserID(i);
            userM.setFullname(("abc"+i)+"");

            userM.setManagerID(null);
            userM.setExecutiveID((int)(Math.random()*500));

           System.out.println(userM);
            String jsonStr = mapper.writeValueAsString(userM);
            System.out.println(jsonStr);
           WriteFile("./src/test/java/text/record.txt",jsonStr+",\n");
//            WriteFile("./src/test/java/text/record.txt",userM.toString()+",\n");
        }
//        ObjectMapper mapper = new ObjectMapper();
//
//        //set information manager(add)
//        User userM = new User();
//        userM.setFullname("kjadshj");
//        userM.setEmail("sagfhjgf");
//        userM.setTitle("sadgadsg");
//        userM.setDepartment("asdgsadg");
//
//        userM.setManagerID(null);
//        userM.setExecutiveID(4);
//
//        System.out.println(userM);
//        String jsonStr = mapper.writeValueAsString(userM);
//        System.out.println(jsonStr);
//        WriteFile("./src/test/java/text/record.txt",jsonStr);
//        userM = userRepository.save(userM);

        //set username and password manager
        /*UserRole userRoleM = new UserRole();
        userRoleM.setUserID(userM.getUserID());
        userRoleM.setUserName(userInformation.getUserName());
        userRoleM.setPassword(passwordEncoder.encode(userInformation.getPassword()));
        HashSet<Role> roleHashSet = new HashSet<>();
        roleHashSet.add(roleRepository.findByRole("ROLE_MANAGER"));
        userRoleM.setRoles(roleHashSet);
        userRoleM = userRoleRepository.save(userRoleM);*/
    }

    @Test
    public void contextLoads() throws JsonProcessingException {
        ProjectApplicationTests Fi= new ProjectApplicationTests();

        Fi.add();
//       String strTextFile = "./record.txt";
//        Fi.ReadFile(strTextFile);
//
//        String strTextData = "\nhelooooooooooo";
//        Fi.WriteFile("./record.txt",strTextData);
        Fi.ReadFile("./src/test/java/text/record.txt");
    }


    public void WriteFile(String strFile, String strData) {
        try(BufferedWriter bufferedWriter= new BufferedWriter(new FileWriter(strFile,true))) {
            bufferedWriter.write(strData);
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }
    public void ReadFile(String strFile) {
        String strBuffer;
        try(BufferedReader bufferedReader = new BufferedReader(new FileReader(strFile))) {
            while ((strBuffer = bufferedReader.readLine())!=null) {
                System.out.println(strBuffer);
            }
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }



}
