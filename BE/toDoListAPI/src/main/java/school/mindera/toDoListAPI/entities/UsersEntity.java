package school.mindera.toDoListAPI.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.logging.log4j.util.Strings;
import school.mindera.toDoListAPI.model.DTOEditUser;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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

    @OneToMany(mappedBy = "userId")
    private List<UsersEntity> groups;

    @OneToMany(mappedBy = "userId")
    private List<TasksEntity> tasks;

    @OneToMany(mappedBy = "tagId")
    private List<TagsEntity> tags;

    public void update(DTOEditUser editUser){
        this.setFirstName(Objects.isNull(editUser.getFirstName()) || Strings.isEmpty(editUser.getFirstName()) ? this.getFirstName() : editUser.getFirstName());
        this.setLastName(Objects.isNull(editUser.getLastName()) || Strings.isEmpty(editUser.getFirstName()) ? this.getLastName() : editUser.getLastName());
        this.setProfileImage(Objects.isNull(editUser.getProfileImage()) || Strings.isEmpty(editUser.getFirstName()) ? this.getProfileImage() : editUser.getProfileImage());
        this.setUsername(Objects.isNull(editUser.getUsername()) || Strings.isEmpty(editUser.getFirstName()) ? this.getUsername() : editUser.getUsername());
    }
}
