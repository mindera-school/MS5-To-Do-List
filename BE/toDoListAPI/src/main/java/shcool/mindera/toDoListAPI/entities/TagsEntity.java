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
@Table(name = "tags")
public class TagsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String name;
//    @ManyToOne
//    @JoinColumn(name = "id")
//    @Column(nullable = false)
//    private UsersEntity userId;

//    @OneToMany(mappedBy = "tagId")
//    private List<TaskTagsEntity> taskTagsOfUsers;
}