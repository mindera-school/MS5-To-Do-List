package school.mindera.toDoListAPI.entities.compositePrimaryKeys;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class FollowersId implements Serializable {

    private Integer userId;
    private Integer followingId;

    public boolean equals(FollowersId followersId){
        return (Objects.equals(this.userId, followersId.userId)) && (Objects.equals(this.followingId, followersId.followingId));
    }
}
