package school.mindera.toDoListAPI.exceptions;

import lombok.*;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ErrorResponse {
    String message;
    String type;
    Integer code;
    Date timestamp;
}
