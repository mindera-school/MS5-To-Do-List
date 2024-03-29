package school.mindera.toDoListAPI.entities;

import lombok.*;
import org.apache.logging.log4j.util.Strings;
import school.mindera.toDoListAPI.model.DTOEditUser;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "users")
public class UsersEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "firstname", nullable = false)
    private String firstName;

    @Column(name = "lastname", nullable = false)
    private String lastName;

    @Column()
    private String profileImage;

    @Column()
    private Integer tries;

    @OneToMany(mappedBy = "userId")
    private List<UsersEntity> groups;

    @OneToMany(mappedBy = "userId")
    private List<TasksEntity> tasks;

    @OneToMany(mappedBy = "tagId")
    private List<TagsEntity> tags;

    public void update(DTOEditUser editUser){
        this.setFirstName(Objects.isNull(editUser.getFirstName()) || Strings.isEmpty(editUser.getFirstName()) ? this.getFirstName() : editUser.getFirstName());
        this.setLastName(Objects.isNull(editUser.getLastName()) || Strings.isEmpty(editUser.getFirstName()) ? this.getLastName() : editUser.getLastName());
        this.setUsername(Objects.isNull(editUser.getUsername()) || Strings.isEmpty(editUser.getFirstName()) ? this.getUsername() : editUser.getUsername());
        this.setPassword(Objects.isNull(editUser.getPassword()) || Strings.isEmpty(editUser.getPassword()) ? this.getPassword() : editUser.getPassword());
    }
}
