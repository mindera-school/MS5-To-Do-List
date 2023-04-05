package school.mindera.toDoListAPI.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import school.mindera.toDoListAPI.entities.TagsEntity;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DTOTaskDetails {
    private Integer taskId;
    private String title;
    private String description;
    private Boolean isDone;
    private String date;
    private Boolean expired;
    private Boolean isFavorite;
    private Integer parentId;
    private Integer position;
    private List<DTOTag> tags;
    private String commentsURL;
}
