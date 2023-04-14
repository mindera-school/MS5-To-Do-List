package school.mindera.toDoListAPI.entities.compositePrimaryKeys;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class CodeId implements Serializable {
    @Column(name = "userId")
    private Integer userId;

    @Column(name = "code")
    private String code;

    @Column(name = "timestamp")
    private Date timestamp;

}
