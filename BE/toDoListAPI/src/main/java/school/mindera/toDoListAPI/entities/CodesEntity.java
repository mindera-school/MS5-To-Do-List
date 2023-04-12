package school.mindera.toDoListAPI.entities;

import school.mindera.toDoListAPI.entities.compositePrimaryKeys.CodeId;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "codes")
public class CodesEntity {
    @EmbeddedId
    private CodeId codeId = new CodeId();

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "userId")
    private UsersEntity userId;
}
