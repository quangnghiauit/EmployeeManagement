package vn.zalopay.project.Service;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.zalopay.project.Model.UserRole;
import vn.zalopay.project.Repository.UserRoleRepository;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import javax.management.Query;

import static com.mongodb.client.model.Filters.eq;

@Service
public class UserRoleServiceImpl implements UserRoleService{

    MongoClientURI connectionString = new MongoClientURI("mongodb://localhost:27017");
    MongoClient mongoClient = new MongoClient(connectionString);
    MongoDatabase database = mongoClient.getDatabase("employeemanagement");

    MongoCollection<Document> collection = database.getCollection("userRole");

    @Autowired
    private UserRoleRepository userRoleRepository;
    @Override
    public UserRole update(UserRole oldAccount) {
        return userRoleRepository.checkUserName(oldAccount.getUserName());


    }

//    @Override
//    public UserRole findUserIDByUserName(String userName) {
//        Document myDoc = collection.find(eq("userName", userName)).first();
//        return  myDoc.
//    }

}
