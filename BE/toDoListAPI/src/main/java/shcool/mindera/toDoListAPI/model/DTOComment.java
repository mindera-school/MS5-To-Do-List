package shcool.mindera.toDoListAPI.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DTOComment {

    private Integer id;
    private String description;
    private String date;
    private String userName;
    private Integer userId;
    private Integer taskId;
}
