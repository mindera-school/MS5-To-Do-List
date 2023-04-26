package school.mindera.toDoListAPI.model;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@EqualsAndHashCode
public class DTOLoggedUser {
    private Integer userId;
    private String firstName;
    private String lastName;
    private String profileImage;
    private String username;
    private String email;
    private String tasksPreviewsURL;
}
