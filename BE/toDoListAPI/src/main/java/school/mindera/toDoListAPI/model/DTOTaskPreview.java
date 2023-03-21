package school.mindera.toDoListAPI.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DTOTaskPreview {
    private Integer taskId;
    private Integer parentId;
    private Integer position;
    private String title;
    private Boolean isDone;
    private String date;
    private Boolean expired;
    private Boolean isFavorite;
    private String taskURL;
    private List<DTOTag> tags;

}
