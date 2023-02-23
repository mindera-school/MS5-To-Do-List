package shcool.mindera.toDoListAPI.entities;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "comments")
public class CommentsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String description;

    @Column(name = "taskid", nullable = false)
    private int taskId;

    @Column(name = "userid", nullable = false)
    private int userId;
}
