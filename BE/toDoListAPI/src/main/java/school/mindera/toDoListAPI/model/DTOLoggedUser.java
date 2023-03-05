package school.mindera.toDoListAPI.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DTOLoggedUser {
    private Integer userId;
    private String firstName;
    private String lastName;
    private String userName;
    private List<DTOGroup> groups;

}
