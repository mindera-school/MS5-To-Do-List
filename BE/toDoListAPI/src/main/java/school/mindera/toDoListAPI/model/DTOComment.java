package school.mindera.toDoListAPI.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DTOComment {

    private Integer commentId;
    private String description;
    private String date;
    private Integer taskId;
}
