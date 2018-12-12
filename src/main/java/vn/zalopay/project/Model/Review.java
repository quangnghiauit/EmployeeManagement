package vn.zalopay.project.Model;

import javax.persistence.*;


@Entity
@Table(name="review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="reviewID")
    private Integer reviewID;

    @Column(name="userReviewID")
    private Integer userReviewID;

    @Column(name="userReceivedID")
    private Integer userReceivedID;

    @Column(name="rating")
    private String rating;

    @Column(name="note")
    private String note;

    public Integer getReviewID() {
        return reviewID;
    }

    public void setReviewID(Integer reviewID) {
        this.reviewID = reviewID;
    }

    public Integer getUserReviewID() {
        return userReviewID;
    }

    public void setUserReviewID(Integer userReviewID) {
        this.userReviewID = userReviewID;
    }

    public Integer getUserReceivedID() {
        return userReceivedID;
    }

    public void setUserReceivedID(Integer userReceivedID) {
        this.userReceivedID = userReceivedID;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public String toString() {
        return "(" +
                 reviewID +
                ", " + userReviewID +
                ", " + userReceivedID +
                ", \"" + rating + '\"' +
                ", \"" + note + '\"' +
                ')';

    }
}
