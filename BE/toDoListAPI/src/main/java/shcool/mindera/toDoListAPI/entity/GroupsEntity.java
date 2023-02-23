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
@Table(name = "groups")
public class GroupsEntity {
    @Id
    private int id;
    @Column(nullable = false)
    private String name;
}
