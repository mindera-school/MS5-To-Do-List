package school.mindera.toDoListAPI.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DTOLogin {
    private String userName;
    private String password;
}
