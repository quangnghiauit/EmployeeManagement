package vn.zalopay.project.Model;

import javax.persistence.*;


import java.util.Date;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userID")
    private Integer userID;

    @Column(name = "fullname")
    private String fullname;

    @Column(name = "email")
    private String email;

    @Column(name = "birthDate")
    private Date birthDate;

    @Column(name = "phoneNumber")
    private String phoneNumber;

    @Column(name = "gender")
    private String gender;

    @Column(name = "startHire")
    private Date startHire;

    @Column(name = "address")
    private String address;

    @Column(name = "statusUser")// 0: inactive , 1: active
    private Integer statusUser;

    @Column(name = "statusAction") // 0 : add , 1: delete
    private Integer statusAction;

    @Column(name = "department")
    private String department;


    @Column(name = "title")
    private String title;

    @Column(name = "managerID")
    private Integer managerID;

    @Column(name = "executiveID")
    private Integer executiveID;




    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getStartHire() {
        return startHire;
    }

    public void setStartHire(Date startHire) {
        this.startHire = startHire;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getStatusUser() {
        return statusUser;
    }

    public void setStatusUser(Integer statusUser) {
        this.statusUser = statusUser;
    }

    public Integer getStatusAction() {
        return statusAction;
    }

    public void setStatusAction(Integer statusAction) {
        this.statusAction = statusAction;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getManagerID() {
        return managerID;
    }

    public void setManagerID(Integer managerID) {
        this.managerID = managerID;
    }

    public Integer getExecutiveID() {
        return executiveID;
    }

    public void setExecutiveID(Integer executiveID) {
        this.executiveID = executiveID;
    }


    @Override
    public String toString() {
        return "{" +
                "userID=" + userID +
                ", fullname='" + fullname + '\'' +
                ", email='" + email + '\'' +
                ", birthDate=" + birthDate +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", gender='" + gender + '\'' +
                ", startHire=" + startHire +
                ", address='" + address + '\'' +
                ", statusUser=" + statusUser +
                ", statusAction=" + statusAction +
                ", department='" + department + '\'' +
                ", title='" + title + '\'' +
                ", managerID=" + managerID +
                ", executiveID=" + executiveID +
                '}';
    }
}
