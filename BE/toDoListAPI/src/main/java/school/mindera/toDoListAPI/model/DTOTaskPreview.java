package school.mindera.toDoListAPI.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DTOTaskPreview {
    private Integer taskId;
    private Integer groupId;
    private String title;
    private Boolean isDone;
    private String date;
    private Boolean expired;
    private  Boolean isFavorite;
    private String URL;

}
