package vn.zalopay.project;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.javafaker.Faker;
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
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;


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


    private static class GenNumberThread implements Runnable {

        int start;
        int end;

        public GenNumberThread(int start, int end) {
            this.start = start;
            this.end = end;
        }

        @Override
        public void run() {
            //writefile
            for(int i = start ; i<=end;i++) {
                //fake data
                Locale locale= new Locale("en");
                Faker faker = new Faker(locale);
                String fullName = faker.name().fullName();
                String phoneNumber = faker.phoneNumber().phoneNumber();
                String email=faker.internet().emailAddress();
                String address = faker.address().city();
//                //convert JSON
//                ObjectMapper mapper = new ObjectMapper();

                //set information manager(add)
                User userM = new User();
                userM.setUserID(i);
                userM.setFullname(fullName);
                userM.setPhoneNumber(phoneNumber);
                userM.setEmail(email);
                userM.setAddress(address);
                userM.setStatusUser(1);
                userM.setStatusAction(0);
                userM.setManagerID(null);
                userM.setExecutiveID((int)(Math.random()*500));
//            String jsonStr = mpper.writeValueAsString(userM);
//            System.out.println(jsonStr);
                // WriteFile("./src/test/java/text/record.json",jsonStr+",\n");
                WriteFile("./src/test/java/text/record"+start+".txt" ,userM.toString()+",\n");
            }

        }


    }


    @Test
    public void add() throws Exception {



        GenNumberThread thread1 = new GenNumberThread(0, 200000);
        GenNumberThread thread2 = new GenNumberThread(200001, 500000);
        GenNumberThread thread3 = new GenNumberThread(500001, 750000);
        GenNumberThread thread4 = new GenNumberThread(750001, 1000000);


        ExecutorService service = Executors.newFixedThreadPool(4);


        Future result1 = service.submit(thread1);
        Future result2 = service.submit(thread2);
        Future result3 = service.submit(thread3);
        Future result4 =  service.submit(thread4);

        service.awaitTermination(9999999, TimeUnit.HOURS);

        result1.get();
        result2.get();

        result3.get();
        result4.get();


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



    public static void WriteFile(String strFile, String strData) {
        try(BufferedWriter bufferedWriter= new BufferedWriter(new FileWriter(strFile,true))) {
            bufferedWriter.write(strData);
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }
    public static void ReadFile(String strFile) {
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
