package school.mindera.toDoListAPI.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import school.mindera.toDoListAPI.entities.compositePrimaryKeys.CodeId;

import javax.persistence.*;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "codes")
public class CodesEntity {
    @EmbeddedId
    private CodeId codeId = new CodeId();

    @Column(name = "expireDate", nullable = false)
    private Date expireDate;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "userId")
    private UsersEntity userId;

    public static CodesBuilder builder(){
        return new CodesBuilder();
    }

    public static class CodesBuilder {

        private String code;
        private UsersEntity userId;
        private Date timestamp;
        private Date expireDate;

        public CodesBuilder code(String code) {
            this.code = code;
            return this;
        }

        public CodesBuilder userId(UsersEntity userId) {
            this.userId = userId;
            return this;
        }

        public CodesBuilder timestamp(Date timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public CodesBuilder expireDate(Date expireDate) {
            this.expireDate = expireDate;
            return this;
        }

        public CodesEntity build() {
            CodeId codeId = new CodeId();
            codeId.setCode(code);
            codeId.setUserId(userId.getUserId());
            codeId.setTimestamp(timestamp);

            CodesEntity newCode = new CodesEntity();
            newCode.setCodeId(codeId);
            newCode.setUserId(userId);
            newCode.setExpireDate(expireDate);

            return newCode;
        }
    }
}
