package shcool.mindera.toDoListAPI.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "comments")
public class CommentsEntity {
    @Id
    private int id;

    @Column(nullable = false)
    private String description;

    @Column(name = "taskid", nullable = false)
    private int taskId;

    @Column(name = "userid", nullable = false)
    private int userId;
}
