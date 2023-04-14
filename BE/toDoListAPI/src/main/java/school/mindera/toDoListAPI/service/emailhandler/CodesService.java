package school.mindera.toDoListAPI.service.emailhandler;

import org.joda.time.DateTime;
import org.springframework.stereotype.Service;
import school.mindera.toDoListAPI.entities.CodesEntity;
import school.mindera.toDoListAPI.entities.UsersEntity;
import school.mindera.toDoListAPI.exceptions.user.EmailNotFoundException;
import school.mindera.toDoListAPI.repositories.CodesRepository;
import school.mindera.toDoListAPI.repositories.UsersRepository;
import school.mindera.toDoListAPI.utils.CodeGenerator;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

import static java.util.Objects.isNull;

@Service
public class CodesService {

    private final CodesRepository codesRepository;
    private final UsersRepository usersRepository;

    public CodesService(CodesRepository codesRepository, UsersRepository usersRepository) {
        this.codesRepository = codesRepository;
        this.usersRepository = usersRepository;
    }

    public String createNewChangePasswordAttempt(String email){
        if(isNull(email)){
            throw new EmailNotFoundException("Email can not be null!");
        }

        String token = CodeGenerator.generateToken();

        Optional<UsersEntity> user = usersRepository.findByEmail(email);
        if(user.isEmpty()){
            throw new EmailNotFoundException("This email is not registered");
        }

        Date timestamp = new Date();
        DateTime expireDate = new DateTime(timestamp).plusDays(1);

        CodesEntity newCode = CodesEntity.builder()
                .code(token)
                .userId(user.get())
                .timestamp(timestamp)
                .expireDate(expireDate.toDate())
                .build();

        codesRepository.save(newCode);

        return token;
    }
}
