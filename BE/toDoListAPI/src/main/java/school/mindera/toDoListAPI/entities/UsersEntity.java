package school.mindera.toDoListAPI.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")
public class UsersEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

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

    @OneToMany(mappedBy = "userId")
    private List<TagsEntity> tags;

    @OneToMany(mappedBy = "userId")
    private List<CommentsEntity> comments;

    @OneToMany(mappedBy = "user")
    private List<FollowersEntity> followers;
}
