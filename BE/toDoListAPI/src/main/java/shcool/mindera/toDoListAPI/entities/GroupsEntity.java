package shcool.mindera.toDoListAPI.entities;

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
@Table(name = "groups")
public class GroupsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer groupId;
    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "groupId")
    private List<TasksEntity> tasks;

//    @Column(name = "user_id", nullable = false)
//    private UsersEntity userId;
}
