package school.mindera.toDoListAPI.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DTOEditUser {
    String firstName;
    String lastName;
    String username;
    String password;
    String currentPassword;
}
