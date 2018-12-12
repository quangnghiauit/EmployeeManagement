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
import vn.zalopay.project.Model.Review;
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
            for (int i = start; i <= end; i++) {
                //fake data
//                Locale locale = new Locale("en");
//                Faker faker = new Faker(locale);
//                String fullName = faker.name().fullName();
//                String phoneNumber = faker.phoneNumber().phoneNumber();
//
//                String email = faker.internet().emailAddress();
//                String address = faker.address().city();

                //set information executive(add)
                // id= 1->100 => executive
//                User userM = new User();
//                userM.setUserID(i);
//                userM.setFullname(fullName);
//                userM.setPhoneNumber(phoneNumber);
//                userM.setEmail(email);
//
//                if(i%2!=0) {userM.setGender("Male");}
//                else {userM.setGender("Female");}
//
//                userM.setDepartment("Zalo Pay");
//                userM.setTitle("Executive");
//                userM.setAddress(address);
//                userM.setStatusUser(1);
//                userM.setStatusAction(0);
//                userM.setManagerID(null);
//                userM.setExecutiveID(null);
                //set information manager(add)
                // id = 101 -> 4000 => manager
//                User userM = new User();
//                userM.setUserID(i);
//                userM.setFullname(fullName);
//                userM.setPhoneNumber(phoneNumber);
//                userM.setEmail(email);
//                if (i % 2 != 0) {
//                    userM.setGender("Male");
//                } else {
//                    userM.setGender("Female");
//                }
//
//                userM.setDepartment("Zalo Pay");
//                userM.setTitle("Lead");
//                userM.setAddress(address);
//                userM.setStatusUser(1);
//                userM.setStatusAction(0);
//
//                userM.setManagerID(null);
//                userM.setExecutiveID((int) (Math.random() * 100));
//
//                System.out.println(userM.toString());
//                WriteFile("./src/test/java/text/manager" + start + ".txt", userM.toString() + ",\n");

                //set information worker(add)
//id=4001->1000000=> worker
//                User userW = new User();
//                userW.setUserID(i);
//                userW.setFullname(fullName);
//                userW.setPhoneNumber(phoneNumber);
//                userW.setEmail(email);
//                if (i % 2 != 0) {
//                    userW.setGender("Male");
//                } else {
//                    userW.setGender("Female");
//                }
//
//                userW.setDepartment("Zalo Pay");
//                userW.setTitle("Fresher");
//                userW.setAddress(address);
//                userW.setStatusUser(1);
//                userW.setStatusAction(0);
//
//                userW.setManagerID((int) (100 + Math.random() * 3899));
//                userW.setExecutiveID((int) (Math.random() * 100));
//
//                System.out.println(userW.toString());
//                WriteFile("./src/test/java/text/worker" + start + ".txt", userW.toString() + ",\n");



                //set information manager mongod(add)
//                ObjectMapper mapper = new ObjectMapper();
//
//                UserRole userW = new UserRole();
//                userW.setUserID(i);
//                userW.setUserName("executive" + i + "");
//                userW.setPassword("$2a$10$lEQsQ8.h6pwN2bAeF8fxJeL4BGzgRit4zk7j6.QBDVkancYc/..Vm");
//                userW.setRoles("ROLE_EXECUTIVE");
//
//                String jsonUserW = null;
//                try {
//                    jsonUserW = mapper.writeValueAsString(userW);
//                } catch (JsonProcessingException e) {
//                    e.printStackTrace();
//                }
//                System.out.println(jsonUserW);
//
//                WriteFile("./src/test/java/text/executivemongo" + start + ".json", jsonUserW + "\n");



                Review dbReview = new Review();
                dbReview.setReviewID(i);
                dbReview.setUserReviewID((int) (100+ Math.random()*3899));
                dbReview.setUserReceivedID((int) (4000+ Math.random()*990000));
                if (i % 2 != 0) {
                    dbReview.setRating("Excellent");
                } else {
                    dbReview.setRating("Good");
                }

                dbReview.setNote("No comment.");
                System.out.println(dbReview.toString());
                WriteFile("./src/test/java/text/reviewmanager" + start + ".txt", dbReview.toString() + ",\n");
            }

        }


    }


    @Test
    public void add() throws Exception {
        GenNumberThread thread1 = new GenNumberThread(1000001, 1250000);
        GenNumberThread thread2 = new GenNumberThread(1250001, 1500000);
        GenNumberThread thread3 = new GenNumberThread(1500001, 1750000);
        GenNumberThread thread4 = new GenNumberThread(1750001, 2000000);


        ExecutorService service = Executors.newFixedThreadPool(4);


        Future result1 = service.submit(thread1);
        Future result2 = service.submit(thread2);
        Future result3 = service.submit(thread3);
        Future result4 = service.submit(thread4);

        service.awaitTermination(10, TimeUnit.SECONDS);

        result1.get();
        result2.get();
        result3.get();
        result4.get();
    }


    public static void WriteFile(String strFile, String strData) {
        try (BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(strFile, true))) {
            bufferedWriter.write(strData);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void ReadFile(String strFile) {
        String strBuffer;
        try (BufferedReader bufferedReader = new BufferedReader(new FileReader(strFile))) {
            while ((strBuffer = bufferedReader.readLine()) != null) {
                System.out.println(strBuffer);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}
