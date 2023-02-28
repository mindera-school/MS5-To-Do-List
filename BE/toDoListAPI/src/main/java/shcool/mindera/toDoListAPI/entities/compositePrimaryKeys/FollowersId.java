package shcool.mindera.toDoListAPI.entities.compositePrimaryKeys;

import lombok.AllArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@AllArgsConstructor
public class FollowersId implements Serializable {
    private Integer followerId;
    private Integer userId;

    public boolean equals(FollowersId followersId){
        return (Objects.equals(this.followerId, followersId.followerId)) && (Objects.equals(this.userId, followersId.userId));
    }
}
