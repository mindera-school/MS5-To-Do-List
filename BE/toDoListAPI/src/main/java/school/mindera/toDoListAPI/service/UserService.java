package school.mindera.toDoListAPI.service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import school.mindera.toDoListAPI.entities.UsersEntity;
import school.mindera.toDoListAPI.exceptions.user.InvalidUserException;
import school.mindera.toDoListAPI.exceptions.user.UserAlreadyExistsException;
import school.mindera.toDoListAPI.exceptions.user.UserLockedException;
import school.mindera.toDoListAPI.exceptions.user.UserWrongCredentials;
import school.mindera.toDoListAPI.model.*;
import school.mindera.toDoListAPI.repositories.UsersRepository;

import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {

    private final UsersRepository usersRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UsersRepository usersRepository, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<DTOLoggedUser> register(DTORegister register) {
        if (usersRepository.existsByUsername(register.getUsername())){
            throw new UserAlreadyExistsException("this username is already been used");
        }
        if (usersRepository.existsByEmail(register.getEmail())){
            throw new UserAlreadyExistsException("this email is already been used");
        }

        UsersEntity newUser = new UsersEntity();
        newUser.setUsername(register.getUsername());
        newUser.setPassword(passwordEncoder.encode(register.getPassword()));
        newUser.setFirstName(register.getFirstName());
        newUser.setLastName(register.getLastName());
        newUser.setEmail(register.getEmail());
        newUser.setTries(0);

        UsersEntity savedUser = usersRepository.save(newUser);

        DTOLoggedUser loggedUser = new DTOLoggedUser();
        loggedUser.setUserId(savedUser.getUserId());
        loggedUser.setUsername(savedUser.getUsername());
        loggedUser.setFirstName(savedUser.getFirstName());
        loggedUser.setLastName(savedUser.getLastName());
        loggedUser.setEmail(savedUser.getEmail());
        loggedUser.setTasksPreviewsURL("/task-previews/" + savedUser.getUserId());

        return ResponseEntity.ok(loggedUser);
    }

    public ResponseEntity<DTOLoggedUser> logIn(DTOLogin login) {
        Optional<UsersEntity> optionalUser = usersRepository.findByUsername(login.getUsername());

        if (optionalUser.isPresent()) {
            UsersEntity user = optionalUser.get();
            if (user.getTries() >= 5){
                throw new UserLockedException("Too many tries!!!");
            }
            if (passwordEncoder.matches(login.getPassword(),user.getPassword())) {
                DTOLoggedUser loggedUser = new DTOLoggedUser();
                loggedUser.setUserId(user.getUserId());
                loggedUser.setUsername(user.getUsername());
                loggedUser.setFirstName(user.getFirstName());
                loggedUser.setLastName(user.getLastName());
                loggedUser.setEmail(user.getEmail());
                user.setTries(0);
                loggedUser.setTasksPreviewsURL("/task-previews/" + user.getUserId());
                usersRepository.save(user);
                return ResponseEntity.ok(loggedUser);
            }
            user.setTries(user.getTries() + 1);
            usersRepository.save(user);
        }
        throw new UserWrongCredentials("Wrong Credentials");
    }

    public void changeUserProfileImg(Integer userId, DTOChangeImg changeImg){
        Optional<UsersEntity> user = usersRepository.findById(userId);

        if (user.isEmpty()){
            throw new InvalidUserException("Invalid user");
        }


        user.get().setProfileImage(changeImg.getProfileImage());

        usersRepository.save(user.get());
    }

    public ResponseEntity<DTOLoggedUser> editUserInfo(Integer userId, DTOEditUser newInfo) {
        Optional<UsersEntity> dbUser = usersRepository.findById(userId);

        if (dbUser.isEmpty()){
            throw new InvalidUserException("Invalid user");
        }
        if (!Objects.isNull(newInfo.getUsername()) && usersRepository.existsByUsername(newInfo.getUsername())){
            throw new UserAlreadyExistsException("This username is already in use");
        }

        UsersEntity user = dbUser.get();
        if(!passwordEncoder.matches(newInfo.getCurrentPassword(), user.getPassword())){
            throw new UserWrongCredentials("Password is wrong!!!");
        }
        newInfo.setPassword(passwordEncoder.encode(newInfo.getPassword()));
        user.update(newInfo);
        usersRepository.save(user);

        return ResponseEntity.ok(Converter.toDTOLogged(user));
    }
}
