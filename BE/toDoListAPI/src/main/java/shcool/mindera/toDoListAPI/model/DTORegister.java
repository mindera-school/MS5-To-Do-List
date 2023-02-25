package shcool.mindera.toDoListAPI.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DTORegister {
private String email;
private String fistName;
private String lastName;
private String userName;
private  String password;
}
