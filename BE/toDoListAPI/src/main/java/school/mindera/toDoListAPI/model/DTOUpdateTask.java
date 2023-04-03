package school.mindera.toDoListAPI.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DTOUpdateTask {
    private Integer taskId;
    private String title;
    private String description;
    private Boolean isDone;
    private String date;
    private Boolean isFavorite;
    private Boolean disabled;
}
