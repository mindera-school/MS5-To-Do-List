package school.mindera.toDoListAPI.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import school.mindera.toDoListAPI.exceptions.InvalidTaskException;

import java.text.SimpleDateFormat;
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
    private String date;
    private Boolean isDone;
    private Boolean isFavorite;
    private String fullTaskURL;
    private List<DTOTag> tags;

    public boolean isExpired(){
        if (Objects.isNull(date)){
            return false;
        }
        SimpleDateFormat formatDate = new SimpleDateFormat("dd/MM/yyyy");
        boolean expiredDate;
        try {
            expiredDate = formatDate.parse(date).after(new Date());
        }catch (Exception e){
            throw new InvalidTaskException("Invalid Date");
        }
        return expiredDate;
    }

}
