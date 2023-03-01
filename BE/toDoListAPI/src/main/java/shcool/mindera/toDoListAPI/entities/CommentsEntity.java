package shcool.mindera.toDoListAPI.entities;

import lombok.*;

import javax.persistence.*;
import javax.transaction.Transactional;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "comments")
public class CommentsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentId;

    @Column(nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "taskId")
    private TasksEntity taskId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private UsersEntity userId;
}
