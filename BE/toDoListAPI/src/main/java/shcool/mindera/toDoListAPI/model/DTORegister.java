package shcool.mindera.toDoListAPI.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DTORegister {
private String email;
private String firstName;
private String lastName;
private String userName;
private  String password;
}
