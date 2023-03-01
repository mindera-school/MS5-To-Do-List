package shcool.mindera.toDoListAPI.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tasks")
public class TasksEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer taskId;

    @ManyToOne()
    @JoinColumn(name = "userId")
    private UsersEntity userId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(name = "isdone", nullable = false)
    private boolean isDone;

    @Column(name = "enddate")
    private Date endDate;

    @ManyToOne()
    @JoinColumn(name = "groupId")
    private GroupsEntity groupId;

    @Column(nullable = false)
    private boolean favorite;

    @OneToMany(mappedBy = "taskId")
    private List<CommentsEntity> comments;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "task_tags", joinColumns = @JoinColumn(name = "task_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private List<TagsEntity> tags;
}
