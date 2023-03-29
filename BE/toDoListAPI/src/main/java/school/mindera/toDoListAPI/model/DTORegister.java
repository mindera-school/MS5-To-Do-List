package school.mindera.toDoListAPI.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DTORegister {
private String email;
private String firstName;
private String lastName;
private String profileImage;
private String username;
private String password;
}
