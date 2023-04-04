package school.mindera.toDoListAPI.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DTONewTask {
    private String title;
    private String description;
    private Date date;
    private Integer userId;
    private Integer parentId;
    private Integer position;
}
