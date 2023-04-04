package school.mindera.toDoListAPI.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DTOTaskPreview {
    private Integer taskId;
    private Integer parentId;
    private Integer position;
    private String title;
    private Date date;
    private Boolean isDone;
    private Boolean isFavorite;
    private String taskURL;
    private List<DTOTag> tags;

    public boolean isExpired(){
        if (Objects.isNull(date)){
            return false;
        }
        return date.after(new Date());
    }

}
