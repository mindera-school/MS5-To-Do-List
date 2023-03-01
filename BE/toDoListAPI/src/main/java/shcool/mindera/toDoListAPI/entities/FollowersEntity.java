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
public class FollowersEntity {
    @EmbeddedId
    private FollowersId id;

    @ManyToOne
    @MapsId("followingId")
    private UsersEntity following;
    @ManyToOne
    @MapsId("userId")
    private UsersEntity user;

}
