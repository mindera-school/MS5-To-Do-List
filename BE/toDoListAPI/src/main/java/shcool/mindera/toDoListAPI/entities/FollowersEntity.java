package shcool.mindera.toDoListAPI.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import shcool.mindera.toDoListAPI.entities.compositePrimaryKeys.FollowersId;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "followers")
@IdClass(FollowersId.class)
public class FollowersEntity {
    @Id
    @Column(name = "follower_id", nullable = false)
    private Integer followerId;
    @Id
    @Column(name = "user_id", nullable = false)
    private Integer userId;
}
